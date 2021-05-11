import FilmCardView from '../view/film-card.js';
import DetailedFilmCardView from '../view/detailed-film-card.js';
import {render, remove, replace}  from '../utils/render.js';
import {bodyElement} from '../elements.js';
import {UserAction, UpdateType, Mode} from '../const.js';
import dayjs from 'dayjs';

export default class Movie {
  constructor(container, changeData, id, commentsModel, moviesModel) {
    this._container = container;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._moviesModel = moviesModel;
    this._id = id;

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

  init() {
    this._mode = Mode.DEFAULT;

    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent =  new FilmCardView(this._getMovie(), this._getMovieComments());

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

  _getMovie() {
    const movies = this._moviesModel.get().slice();
    const [movie] = movies.filter((movie) => this._id === movie.id);
    return movie;
  }

  _getComments() {
    return this._commentsModel.get().slice();
  }

  _getMovieComments() {
    const commentsArray = this._getComments();
    const {comments} = this._getMovie();
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
      replace(this._detailedFilmCardComponent, prevDetailedFilmCardComponent);

      bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._documentKeydownHandler);
    }

    remove(prevDetailedFilmCardComponent);
  }

  closeDetailedFilmCard() {
    if (this._mode !== Mode.DEFAULT) {
      this._detailedFilmCardComponent.getElement().remove();
      this._detailedFilmCardComponent = null;
      this._mode = Mode.DEFAULT;
    }

    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._documentKeydownHandler);
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
    this._renderDetailedFilmCard(this._getMovie(), this._getMovieComments());
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
    this._updateUserDetailsData({
      isWatchlist: !this._getMovie().userDetails.isWatchlist,
    });
    this._updateDetailedFilmCard({newComment: false});
  }

  _handleFavoriteInPopupClick() {
    this._updateUserDetailsData({
      isFavorite: !this._getMovie().userDetails.isFavorite,
    });
    this._updateDetailedFilmCard({newComment: false});
  }

  _handleWatchedInPopupClick() {
    this._updateUserDetailsData({
      isAlreadyWatched: !this._getMovie().userDetails.isAlreadyWatched,
      watchingDate: !this._getMovie().userDetails.isAlreadyWatched ? dayjs() : '',
    });
    this._updateDetailedFilmCard({newComment: false});
  }

  _handleFormSubmit(comment) {
    const movieComments = this._getMovie().comments;

    const newComments = [...movieComments.slice(), comment.id];
    const newMovie = Object.assign(
      {},
      this._getMovie(),
      {
        comments: newComments,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
    this._changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, comment);

    this._updateDetailedFilmCard({newComment: true});
  }

  _handleDeleteCommentClick(comment) {
    const movieComments = this._getMovie().comments;
    const filteredComments = movieComments.filter((item) => item !== comment.id);
    const newMovie = Object.assign(
      {},
      this._getMovie(),
      {
        comments: filteredComments,
      },
    );

    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, newMovie);
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.MINOR, comment);

    this._updateDetailedFilmCard({newComment: false});
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

  _updateScrollPosition(scrollPosition, newComment) {
    if (newComment && scrollPosition !== 0) {
      const newCommentScroll = document.querySelector('.film-details__new-comment').scrollHeight;
      document.querySelector('.film-details').scrollTo(0, scrollPosition + newCommentScroll);
      return;
    }

    if (scrollPosition !== 0) {
      document.querySelector('.film-details').scrollTo(0, scrollPosition);
    }
  }

  _updateDetailedFilmCard({newComment = false}) {
    const scrollPosition = document.querySelector('.film-details').scrollTop;
    this.closeDetailedFilmCard();
    this._renderDetailedFilmCard(this._getMovie(), this._getMovieComments());
    this._updateScrollPosition(scrollPosition, newComment);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
