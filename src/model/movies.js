import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  set(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  get() {
    return this._movies;
  }

  update(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const softAdaptedMovie = Object.assign(
      {},
      movie,
      {
        filmInfo: movie.film_info,
        userDetails: movie.user_details,
      },
    );

    const newUserDetails = Object.assign(
      {},
      softAdaptedMovie.userDetails,
      {
        isAlreadyWatched: movie.user_details.already_watched,
        isFavorite: movie.user_details.favorite,
        isWatchlist: movie.user_details.watchlist,
        watchingDate: movie.user_details.watching_date ? new Date(movie.user_details.watching_date) : null,
      },
    );

    const newRelease = Object.assign(
      {},
      softAdaptedMovie.filmInfo.release,
      {
        releaseCountry: movie.film_info.release.release_country,
        date: new Date(movie.film_info.release.date),
      },
    );

    const newFilmInfo = Object.assign(
      {},
      softAdaptedMovie.filmInfo,
      {
        ageRating: movie.film_info.age_rating,
        alternativeTitle: movie.film_info.alternative_title,
        genres: movie.film_info.genre,
        totalRating: movie.film_info.total_rating,
        release: newRelease,
      },
    );

    const adaptedMovie = Object.assign(
      {},
      softAdaptedMovie,
      {
        userDetails: newUserDetails,
        filmInfo: newFilmInfo,
      },
    );

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;
    delete adaptedMovie.userDetails.already_watched;
    delete adaptedMovie.userDetails.favorite;
    delete adaptedMovie.userDetails.watching_date;
    delete adaptedMovie.userDetails.watchlist;
    delete adaptedMovie.filmInfo.age_rating;
    delete adaptedMovie.filmInfo.alternative_title;
    delete adaptedMovie.filmInfo.genre;
    delete adaptedMovie.filmInfo.total_rating;
    delete adaptedMovie.filmInfo.release.release_country;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const softAdaptedMovie = Object.assign(
      {},
      movie,
      {
        film_info: movie.filmInfo,
        user_details: movie.userDetails,
      },
    );

    const newUserDetails = Object.assign(
      {},
      softAdaptedMovie.user_details,
      {
        already_watched: movie.userDetails.isAlreadyWatched,
        favorite: movie.userDetails.isFavorite,
        watchlist: movie.userDetails.isWatchlist,
        watching_date: movie.userDetails.watchingDate ? movie.userDetails.watchingDate.toISOString() : null,
      },
    );

    const newRelease = Object.assign(
      {},
      softAdaptedMovie.film_info.release,
      {
        release_country: movie.filmInfo.release.releaseCountry,
        date: movie.filmInfo.release.date ? movie.filmInfo.release.date.toISOString() : null,
      },
    );

    const newFilmInfo = Object.assign(
      {},
      softAdaptedMovie.film_info,
      {
        age_rating: movie.filmInfo.ageRating,
        alternative_title: movie.filmInfo.alternativeTitle,
        genre: movie.filmInfo.genres,
        total_rating: movie.filmInfo.totalRating,
        release: newRelease,
      },
    );

    const adaptedMovie = Object.assign(
      {},
      softAdaptedMovie,
      {
        user_details: newUserDetails,
        film_info: newFilmInfo,
      },
    );

    delete adaptedMovie.filmInfo;
    delete adaptedMovie.userDetails;
    delete adaptedMovie.user_details.isAlreadyWatched;
    delete adaptedMovie.user_details.isFavorite;
    delete adaptedMovie.user_details.watchingDate;
    delete adaptedMovie.user_details.isWatchlist;
    delete adaptedMovie.film_info.ageRating;
    delete adaptedMovie.film_info.alternativeTitle;
    delete adaptedMovie.film_info.genres;
    delete adaptedMovie.film_info.totalRating;
    delete adaptedMovie.film_info.release.releaseCountry;

    return adaptedMovie;
  }
}
