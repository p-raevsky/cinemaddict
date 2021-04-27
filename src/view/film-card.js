import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const MAX_LENGTH = 140;

const createMovieComments = (comments) => {
  if (!comments.length) {
    return '0 comments';
  }

  return comments.length > 1
    ? `${comments.length} comments`
    : `${comments.length} comment`;
};

const isSelectedFilmControl = (isChecked) => isChecked ? 'film-card__controls-item--active' : '';

const createFilmCardTemplate = (movie) => {
  const {comments, filmInfo, userDetails} = movie;
  const {
    description,
    genres,
    poster,
    release,
    runtime,
    title,
    totalRating,
  } = filmInfo;

  const {
    isWatchlist,
    isAlreadyWatched,
    isFavorite,
  } = userDetails;

  const movieGenre = genres[0];
  const releaseDate = dayjs(release.date).format('YYYY');
  const movieDescriptionLength = description.length;
  const alternativeDescription = movieDescriptionLength > MAX_LENGTH
    ? `${description.substring(0, MAX_LENGTH - 1)}...`
    : description;
  const movieComments = createMovieComments(comments);

  const watchlistActive = isSelectedFilmControl(isWatchlist);
  const alreadyWatchedtActive = isSelectedFilmControl(isAlreadyWatched);
  const favoriteActive = isSelectedFilmControl(isFavorite);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${movieGenre}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${alternativeDescription}</p>
    <a class="film-card__comments">${movieComments}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActive}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedtActive}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActive}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmCardClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setFilmCardClickHandler(callback, element) {
    this._callback.filmCardClick = callback;
    this.getElement().querySelector(element).addEventListener('click', this._filmCardClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }
}
