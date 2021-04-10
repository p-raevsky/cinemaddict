import dayjs from 'dayjs';
import {createElement} from '../util.js';

const MAX_LENGTH = 140;

const isSelectedFilmControl = (isSomething) => {
  return isSomething
    ? 'film-card__controls-item--active'
    : '';
};

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
  const movieComments = comments.length > 2
    ? `${ comments.length} comments`
    : '1 comment';

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

export default class FilmCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
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
