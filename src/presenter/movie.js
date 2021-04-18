import FilmCardView from '../view/film-card.js';
import DetailedFilmCardView from '../view/detailed-film-card.js';
import {render, remove, replace}  from '../utils/render.js';
import {bodyElement} from '../constant.js';

export default class Movie {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._detailedFilmCardComponent = null;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = comments;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent =  new FilmCardView(this._movie);

    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__poster');

    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__title');

    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick, '.film-card__comments');

    if (prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent);

      return;
    }

    if (this._container.contains(prevFilmCardComponent.getElement())) {
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

    if (bodyElement.contains(prevDetailedFilmCardComponent.getElement())) {
      replace(this._detailedFilmCardComponent, prevDetailedFilmCardComponent);

      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._documentKeydownHandler);
    }

    remove(prevDetailedFilmCardComponent);
  }

  _handleCloseButtonClick() {
    remove(this._detailedFilmCardComponent);
    bodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this._documentKeydownHandler);
  }

  _handleFilmCardClick() {
    this._renderDetailedFilmCard(this._movie, this._comments);
  }

  _documentKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      bodyElement.removeChild(this._detailedFilmCardComponent.getElement());
      bodyElement.classList.remove('hide-overflow');

      document.removeEventListener('keydown', this._documentKeydownHandler);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._detailedFilmCardComponent);
  }
}
