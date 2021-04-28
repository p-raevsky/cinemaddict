import {mainElement} from '../elements.js';
import {render, remove}  from '../utils/render.js';
import {sortMovieByDate, sortMovieByRating} from '../utils/film-card-data.js';
import {SortTypes} from '../const.js';

import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ExtraFilmsListView from '../view/extra-films-list.js';
import NoMovieView from '../view/no-movie.js';
import SortingView from '../view/sorting.js';

import MoviePresenter from '../presenter/movie.js';

const EXTRA_FILM_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED_TITLE = 'Most commented';
export default class MovieList {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;

    this._noMovieComponent = new NoMovieView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._extraFilmsListComponent = new ExtraFilmsListView();
    this._sortingComponent = null;
    this._extraMostCommentedFilmsListComponent = null;
    this._filmsListContainer = null;
    this._topRatedListContainer = null;
    this._mostCommentedContainer = null;
    this._currentSortType = SortTypes.DEFAULT;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    if (!this._getMovies()) {
      this._renderNoMovies();

      return;
    }

    this._renderSort();
    this._renderGeneralMoviesList();
  }

  _getMovies() {
    switch ( this._currentSortType) {
      case SortTypes.DATE:
        this._moviesModel.getMovies().slice().sort(sortMovieByDate);
        break;
      case SortTypes.RATING:
        this._moviesModel.getMovies().slice().sort(sortMovieByRating);
        break;
      default:
        this._moviesModel.getMovies().slice();
    }

    return this._moviesModel.getMovies();
  }

  _getComments() {
    return this._commentsModel.getComments().slice();
  }

  _handleFilmCardChange(updatedMovie) {
    if(this._filmCardPresenter[updatedMovie.id]) {
      this._filmCardPresenter[updatedMovie.id].init(updatedMovie, this._getComments());//вернуться к комментариям
    }

    if (this._topRatedFilmCardPresenter[updatedMovie.id]) {
      this._topRatedFilmCardPresenter[updatedMovie.id].init(updatedMovie, this._getComments());
    }

    if (this._mostCommentedFilmCardPresenter[updatedMovie.id]) {
      this._mostCommentedFilmCardPresenter[updatedMovie.id].init(updatedMovie, this._getComments());
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.closePopup());
  }

  _renderSort() {
    this._sortingComponent = new SortingView(this._currentSortType);
    render(mainElement, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    remove(this._sortingComponent);
    this._renderSort();
    this._clearMovieList();
    this._renderGeneralMoviesList();
  }

  _renderMovie(container, movie, comments) {
    const moviePresenter = new MoviePresenter(container, this._handleFilmCardChange, this._handleModeChange);
    moviePresenter.init(movie, comments);

    return moviePresenter;
  }

  _renderRegularMovieList() {
    const movieCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(movieCount, FILM_COUNT_PER_STEP));

    movies.forEach((movie) => {
      const presenter = this._renderMovie(this._filmsListContainer, movie, this._getComments());
      this._filmCardPresenter[movie.id] = presenter;
    });

    if (movieCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);///проверить
    const movies = this._getMovies().slice(this._renderedFilmCount, newRenderedMovieCount);

    movies
      .forEach((movie) => {
        const presenter = this._renderMovie(this._filmsListContainer, movie, this._getComments());
        this._filmCardPresenter[movie.id] = presenter;
      });

    this._renderedFilmCount = newRenderedMovieCount;

    if (this._renderedFilmCount >= movieCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderTopRatedList() {
    const movies = this._getMovies();
    render(this._filmsContainerComponent, this._extraFilmsListComponent);
    this._topRatedListContainer = this._extraFilmsListComponent.getElement().querySelector('.films-list--extra .films-list__container');

    movies
      .filter((movie) => movie.filmInfo.totalRating)
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((movie) => {
        const presenter = this._renderMovie(this._topRatedListContainer, movie, this._getComments());
        this._topRatedFilmCardPresenter[movie.id] = presenter;
      });
  }

  _renderMostCommentedList() {
    const movies = this._getMovies();
    const moviesWithComments = movies.filter((movie) => movie.comments.length > 0);

    this._extraMostCommentedFilmsListComponent = new ExtraFilmsListView(MOST_COMMENTED_TITLE);
    render(this._filmsContainerComponent, this._extraMostCommentedFilmsListComponent);

    if (!moviesWithComments.length) {
      return;
    }

    this._mostCommentedContainer = this._extraMostCommentedFilmsListComponent.getElement().querySelector('.films-list--extra .films-list__container');

    moviesWithComments
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((movie) => {
        const presenter = this._renderMovie(this._mostCommentedContainer, movie, this._getComments());
        this._mostCommentedFilmCardPresenter[movie.id] = presenter;
      });
  }

  _clearMovieList() {
    const presenters = [
      ...Object.values(this._filmCardPresenter),
      ...Object.values(this._topRatedFilmCardPresenter),
      ...Object.values(this._mostCommentedFilmCardPresenter),
    ];

    presenters.forEach((presenter) => presenter.destroy());

    this._filmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
    remove(this._filmsContainerComponent);
    remove(this._filmsListComponent);
    remove(this._extraFilmsListComponent);
    remove(this._extraMostCommentedFilmsListComponent);
  }

  _renderNoMovies() {
    render(mainElement, this._noMovieComponent);
  }

  _renderGeneralMoviesList() {
    render(mainElement, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);

    this._filmsListContainer = document.querySelector('.films-list__container');
    this._renderRegularMovieList();
    this._renderShowMoreButton();
    this._renderTopRatedList();
    this._renderMostCommentedList();
  }
}
