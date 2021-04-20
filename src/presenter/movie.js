import FilmCardView from '../view/film-card.js';
import DetailedFilmCardView from '../view/detailed-film-card.js';
import {render, remove, replace}  from '../utils/render.js';
import {bodyElement} from '../constant.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._detailedFilmCardComponent = null;
    this._mode = Mode.DEFAULT;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent =  new FilmCardView(this._movie);

    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__poster');
    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__title');
    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__comments');
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _renderDetailedFilmCard(movie, comments) {
    const prevDetailedFilmCardComponent = this._detailedFilmCardComponent;

    this._detailedFilmCardComponent = new DetailedFilmCardView(movie, comments);
    this._detailedFilmCardComponent.setCloseBtnClickHandler(this._handleCloseButtonClick);

    if (prevDetailedFilmCardComponent === null) {
      render(bodyElement, this._detailedFilmCardComponent);

      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._documentKeydownHandler);

      return;
    }

    if (this._mode === Mode.POPUP) {
      replace(this._detailedFilmCardComponent, prevDetailedFilmCardComponent);

      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._documentKeydownHandler);
    }

    remove(prevDetailedFilmCardComponent);
  }

  closePopup() {
    if (this._mode !== Mode.DEFAULT) {
      this._detailedFilmCardComponent.getElement().remove();
      this._detailedFilmCardComponent = null;

      this._mode = Mode.DEFAULT;
    }
  }

  _documentKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.closePopup();
      bodyElement.classList.remove('hide-overflow');

      document.removeEventListener('keydown', this._documentKeydownHandler);
    }
  }

  _handleCloseButtonClick() {
    this.closePopup();
    bodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleFilmCardClick() {
    this._renderDetailedFilmCard(this._movie, this._comments);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _handleAddToWatchlistClick(){
    const movie = this._movie;

    const newUserDetails = Object.assign({}, movie.userDetails, {isWatchlist: !movie.isWatchlist});
    const newMovie = Object.assign({}, movie, {userDetails: newUserDetails});

    this._changeData(newMovie);
  }

  _handleFavoriteClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign({}, movie.userDetails, {isFavorite: !movie.isFavorite});
    const newMovie = Object.assign({}, movie, {userDetails: newUserDetails});

    this._changeData(newMovie);
  }

  _handleWatchedClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign({}, movie.userDetails, {isAlreadyWatched: !movie.isAlreadyWatched});
    const newMovie = Object.assign({}, movie, {userDetails: newUserDetails});

    this._changeData(newMovie);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
