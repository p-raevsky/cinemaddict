import FilmCardView from '../view/film-card.js';
import DetailedFilmCardView from '../view/detailed-film-card.js';
import {render, remove, replace}  from '../utils/render.js';
import {bodyElement} from '../elements.js';
import {UserAction, UpdateType, Mode, State} from '../const.js';
import dayjs from 'dayjs';

export default class Movie {
  constructor(container, changeData, id, moviesModel, api) {
    this._container = container;
    this._changeData = changeData;
    this._moviesModel = moviesModel;

    this._mode = Mode.DEFAULT;
    this._comments = null;
    this._id = id;
    this._api = api;

    this._filmCardComponent = null;
    this._detailedFilmCardComponent = null;

    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleAddToWatchlistInPopupClick = this._handleAddToWatchlistInPopupClick.bind(this);
    this._handleFavoriteInPopupClick = this._handleFavoriteInPopupClick.bind(this);
    this._handleWatchedInPopupClick = this._handleWatchedInPopupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init() {
    this._mode = Mode.DEFAULT;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent =  new FilmCardView(this._getMovie());

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

  _handleModelEvent(... Args) {
    const [,, isNewComment] = Args;

    if (this._mode === Mode.POPUP) {
      this._updateDetailedFilmCard(isNewComment);
    }
  }

  _getMovie() {
    const movies = this._moviesModel.get().slice();
    const [movie] = movies.filter((movie) => this._id === movie.id);
    return movie;
  }

  _renderDetailedFilmCard(movie, comments) {
    this._comments = comments;
    this._mode = Mode.POPUP;
    const prevDetailedFilmCardComponent = this._detailedFilmCardComponent;

    this._detailedFilmCardComponent = new DetailedFilmCardView(movie, comments);

    this._detailedFilmCardComponent.setCloseBtnClickHandler(this._handleCloseButtonClick);
    this._detailedFilmCardComponent.setAddToWatchlistInPopupClickHandler(this._handleAddToWatchlistInPopupClick);
    this._detailedFilmCardComponent.setFavoriteInPopupClickHandler(this._handleFavoriteInPopupClick);
    this._detailedFilmCardComponent.setWatchedInPopupClickHandler(this._handleWatchedInPopupClick);
    this._detailedFilmCardComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._detailedFilmCardComponent.setCommentDeleteHandler(this._handleDeleteCommentClick);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);

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

  _setViewState(state, payload) {
    const resetFormState = () => {
      this._detailedFilmCardComponent.updateData({
        isDisabled: false,
        deletingId: null,
      });
    };

    switch (state) {
      case State.SAVING:
        this._detailedFilmCardComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this._detailedFilmCardComponent.updateData({
          isDisabled: true,
          deletingId: payload,
        });
        break;
      case State.ABORTING:
        this._detailedFilmCardComponent.shake(resetFormState);
        break;
    }
  }

  setAborting() {
    if (this._detailedFilmCardComponent) {
      this._detailedFilmCardComponent.shake(() => {
        this._detailedFilmCardComponent.updateData({
          isDisabled: false,
          deletingId: null,
        });
      });

      return;
    }
    if (this._filmCardComponent) {
      this._filmCardComponent.shake();
    }
  }

  closeDetailedFilmCard() {
    if (this._mode !== Mode.DEFAULT) {
      this._detailedFilmCardComponent.removeHandlers();
      this._detailedFilmCardComponent.getElement().remove();
      this._detailedFilmCardComponent = null;
      this._mode = Mode.DEFAULT;
      bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._documentKeydownHandler);
    }
  }

  _documentKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closeDetailedFilmCard();
    }
  }

  _handleCloseButtonClick() {
    this.closeDetailedFilmCard();
  }

  _handleFilmCardClick() {
    return this._api.getComments(this._id)
      .then((response) => {
        this._renderDetailedFilmCard(this._getMovie(), response);
      })
      .catch(() => {
        this.setAborting();
      });
  }

  _handleAddToWatchlistClick(){
    this._updateUserDetailsData({
      isWatchlist: !this._getMovie().userDetails.isWatchlist,
    });
  }

  _handleFavoriteClick() {
    this._updateUserDetailsData({
      isFavorite: !this._getMovie().userDetails.isFavorite,
    });
  }

  _handleWatchedClick() {
    this._updateUserDetailsData({
      isAlreadyWatched: !this._getMovie().userDetails.isAlreadyWatched,
      watchingDate: !this._getMovie().userDetails.isAlreadyWatched ? dayjs() : '',
    });
  }

  _handleAddToWatchlistInPopupClick() {
    this._setViewState(State.SAVING);
    this._updateUserDetailsData({
      isWatchlist: !this._getMovie().userDetails.isWatchlist,
    });
  }

  _handleFavoriteInPopupClick() {
    this._setViewState(State.SAVING);
    this._updateUserDetailsData({
      isFavorite: !this._getMovie().userDetails.isFavorite,
    });
  }

  _handleWatchedInPopupClick() {
    this._setViewState(State.SAVING);
    this._updateUserDetailsData({
      isAlreadyWatched: !this._getMovie().userDetails.isAlreadyWatched,
      watchingDate: !this._getMovie().userDetails.isAlreadyWatched ? dayjs() : '',
    });
  }

  _handleFormSubmit(comment) {
    this._setViewState(State.SAVING);
    this._api.addComment(comment)
      .then((response) => {
        const newComments = response.comments;

        const newMovie = Object.assign(
          {},
          this._getMovie(),
          {
            comments: newComments,
          },
        );

        this._changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, newMovie);
      })
      .catch(() => {
        this._setViewState(State.ABORTING);
      });
  }

  _handleDeleteCommentClick(commentId) {
    this._setViewState(State.DELETING, commentId);
    this._api.deleteComment(commentId)
      .then(() => {
        const filteredComments = this._comments
          .filter((item) => item.id !== String(commentId))
          .map((comment) => comment.id);

        const newMovie = Object.assign(
          {},
          this._getMovie(),
          {
            comments: filteredComments,
          },
        );

        this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
      })
      .catch(() => {
        this._setViewState(State.ABORTING);
      });
  }

  _updateUserDetailsData(data, actionType = UpdateType.MINOR) {
    const movie = this._getMovie();

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      data,
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, actionType, newMovie);
  }

  _updateScrollPosition(scrollPosition, isNewcomment) {
    const popup = document.querySelector('.film-details');
    popup.scrollTo(0, scrollPosition);

    if (Object.values(isNewcomment)[0]) {
      popup.scrollTop = popup.scrollHeight;
    }
  }

  _updateDetailedFilmCard(isNewComment) {
    const scrollPosition = this._getScrollPosition();
    this.closeDetailedFilmCard();
    this._api.getComments(this._id)
      .then((response) => {
        this._renderDetailedFilmCard(this._getMovie(), response);
        this._updateScrollPosition(scrollPosition, isNewComment);
      });
  }

  _getScrollPosition() {
    if (document.querySelector('.film-details')) {
      return document.querySelector('.film-details').scrollTop;
    }
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
