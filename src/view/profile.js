import {createElement} from '../util.js';

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

const createProfileTemplate = (watchedMovies) => {
  const watchedMoviesAmount = watchedMovies.length;

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

export default class Profile {
  constructor(movies) {
    this._watchedMovies = movies;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedMovies);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
