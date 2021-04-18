import AbstractView from './abstract.js';

const RANK = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUF: 'Movie Buff',
};

const moviesToRankMap = {
  [RANK.NOVICE]: (count) => count <= 10,
  [RANK.FAN]: (count) => count <= 20 && count > 10,
  [RANK.MOVIE_BUF]: (count) => count > 20,
};

const createProfileTemplate = (movies) => {
  const alreadyWatchedMovies = movies.filter((movie) => movie.userDetails.isAlreadyWatched);
  const watchedMoviesAmount = alreadyWatchedMovies.length;

  if (!watchedMoviesAmount) {
    return '';
  }

  const [rankName] = Object.entries(moviesToRankMap)
    .filter(([, rankCount]) => rankCount(watchedMoviesAmount))
    .flat();

  return `<section class="header__profile profile">
    <p class="profile__rating">${rankName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile extends AbstractView {
  constructor(movies) {
    super();
    this._watchedMovies = movies;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedMovies);
  }
}
