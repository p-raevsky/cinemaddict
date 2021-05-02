import FilmCardView from '../view/film-card.js';
import DetailedFilmCardView from '../view/detailed-film-card.js';
import {render, remove, replace}  from '../utils/render.js';
import {bodyElement} from '../elements.js';
import {UserAction, UpdateType} from '../const.js';

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
    this._handleAddToWatchlistInPopupClick = this._handleAddToWatchlistInPopupClick.bind(this);
    this._handleFavoriteInPopupClick = this._handleFavoriteInPopupClick.bind(this);
    this._handleWatchedInPopupClick = this._handleWatchedInPopupClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(movie, comments) {
    this._mode = Mode.DEFAULT;
    this._movie = movie;
    this._comments = this._getMovieComments(this._movie, comments);

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

  _getMovieComments(movie, commentsArray) {
    const {comments} = movie;

    return commentsArray.filter(({id}) => comments.includes(id));
  }

  _renderDetailedFilmCard(movie, comments) {
    this._mode = Mode.POPUP;

    const prevDetailedFilmCardComponent = this._detailedFilmCardComponent;

    this._detailedFilmCardComponent = new DetailedFilmCardView(movie, comments);

    this._detailedFilmCardComponent.setCloseBtnClickHandler(this._handleCloseButtonClick);
    this._detailedFilmCardComponent.setAddToWatchlistInPopupClickHandler(this._handleAddToWatchlistInPopupClick);
    this._detailedFilmCardComponent.setFavoriteInPopupClickHandler(this._handleFavoriteInPopupClick);
    this._detailedFilmCardComponent.setWatchedInPopupClickHandler(this._handleWatchedInPopupClick);
    this._detailedFilmCardComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._detailedFilmCardComponent.setCommentDeleteHandler(this._handleDeleteCommentClick);

    if (prevDetailedFilmCardComponent === null) {
      render(bodyElement, this._detailedFilmCardComponent);
      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._documentKeydownHandler);

      return;
    }

    if (this._mode === Mode.POPUP) {
      const scrollPosition = prevDetailedFilmCardComponent.getElement().scrollTop;
      replace(this._detailedFilmCardComponent, prevDetailedFilmCardComponent);
      this._detailedFilmCardComponent.getElement().scrollTo(0, scrollPosition);

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
  }

  _handleAddToWatchlistClick(){
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isWatchlist: !movie.userDetails.isWatchlist,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);

  }

  _handleFavoriteClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isFavorite: !movie.userDetails.isFavorite,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
  }

  _handleWatchedClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isAlreadyWatched: !movie.userDetails.isAlreadyWatched,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
  }

  _handleAddToWatchlistInPopupClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isWatchlist: !movie.userDetails.isWatchlist,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
  }

  _handleFavoriteInPopupClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isFavorite: !movie.userDetails.isFavorite,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
  }

  _handleWatchedInPopupClick() {
    const movie = this._movie;

    const newUserDetails = Object.assign(
      {},
      movie.userDetails,
      {
        isAlreadyWatched: !movie.userDetails.isAlreadyWatched,
      },
    );

    const newMovie = Object.assign(
      {},
      movie,
      {
        userDetails: newUserDetails,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
  }

  _handleFormSubmit(comment) {
    const movieComments = this._movie.comments;

    const newComments = [...movieComments.slice(), comment.id];
    const newMovie = Object.assign(
      {},
      this._movie,
      {
        comments: newComments,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
    this._changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, comment);
    this.closePopup();
    //открыть попапам с обновленными комментариями.
  }

  _handleDeleteCommentClick(comment) {
    const movieComments = this._movie.comments;
    const filteredComments = movieComments.filter((item) => item !== comment.id);
    const newMovie = Object.assign(
      {},
      this._movie,
      {
        comments: filteredComments,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.MINOR, comment);
    this.closePopup();
    //открыть попапам с обновленными комментариями.
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
