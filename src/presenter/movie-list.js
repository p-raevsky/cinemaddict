import {mainElement} from '../elements.js';
import {render, remove}  from '../utils/render.js';
import {sortMovieByDate, sortMovieByRating} from '../utils/film-card-data.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';

import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ExtraFilmsListView from '../view/extra-films-list.js';
import NoMovieView from '../view/no-movie.js';
import SortingView from '../view/sorting.js';
import LoadingView from '../view/loading.js';

import MoviePresenter from '../presenter/movie.js';

const EXTRA_FILM_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED_TITLE = 'Most commented';

export default class MovieList {
  constructor(container, moviesModel, filterModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._noMovieComponent = new NoMovieView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._extraFilmsListComponent = new ExtraFilmsListView();
    this._loadingComponent = new LoadingView();

    this._showMoreButtonComponent = null;
    this._sortingComponent = null;
    this._extraMostCommentedFilmsListComponent = null;
    this._filmsListContainer = null;
    this._topRatedListContainer = null;
    this._mostCommentedContainer = null;

    this._currentSortType = SortType.DEFAULT;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._isLoading = true;
    this._api = api;

    this._filmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderGeneralMoviesList();
  }

  _getMovies() {
    const filterType = this._filterModel.get();
    const movies = this._moviesModel.get().slice();
    const filtredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredMovies.sort(sortMovieByDate);
      case SortType.RATING:
        return filtredMovies.sort(sortMovieByRating);
    }

    return filtredMovies;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(update)
          .then((response) => {
            this._moviesModel.update(updateType, response, {isNewComment: false});
          })
          .catch(() => {
            if (this._topRatedFilmCardPresenter[update.id]) {
              this._topRatedFilmCardPresenter[update.id].setAborting();
            }
            if (this._mostCommentedFilmCardPresenter[update.id]) {
              this._mostCommentedFilmCardPresenter[update.id].setAborting();
            }
            if (this._filmCardPresenter[update.id]) {
              this._filmCardPresenter[update.id].setAborting();
            }
          });
        break;
      case UserAction.ADD_COMMENT:
        this._api.updateMovie(update)
          .then((response) => {
            this._moviesModel.update(updateType, response, {isNewComment: true});
          });
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderGeneralMoviesList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedMovieCount: true, resetSortType: true});
        this._renderGeneralMoviesList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderGeneralMoviesList();
        break;
    }
  }

  _renderLoading() {
    render(mainElement, this._loadingComponent);
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;

    }

    this._sortingComponent = new SortingView(this._currentSortType);
    render(mainElement, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({resetRenderedMovieCount: true});
    this._renderGeneralMoviesList();
  }

  _renderMovie(container, id) {
    const moviePresenter = new MoviePresenter(container, this._handleViewAction, id, this._moviesModel, this._api);
    moviePresenter.init();

    return moviePresenter;
  }

  _renderRegularMovieList() {
    const movieCount = this._getMovies().length;
    const movies = this._getMovies().slice(0, Math.min(movieCount, this._renderedFilmCount));

    movies.forEach((movie) => {
      const presenter = this._renderMovie(this._filmsListContainer, movie.id);
      this._filmCardPresenter[movie.id] = presenter;
    });

    if (movieCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    render(this._filmsListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderedFilmCount, newRenderedMovieCount);

    movies
      .forEach((movie) => {
        const presenter = this._renderMovie(this._filmsListContainer, movie.id);
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
        const presenter = this._renderMovie(this._topRatedListContainer, movie.id);
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
        const presenter = this._renderMovie(this._mostCommentedContainer, movie.id);
        this._mostCommentedFilmCardPresenter[movie.id] = presenter;
      });
  }

  _clearMovieList({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

    const presenters = [
      ...Object.values(this._filmCardPresenter),
      ...Object.values(this._topRatedFilmCardPresenter),
      ...Object.values(this._mostCommentedFilmCardPresenter),
    ];

    presenters.forEach((presenter) => presenter.destroy());

    this._filmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    remove(this._showMoreButtonComponent);
    remove(this._filmsContainerComponent);
    remove(this._filmsListComponent);
    remove(this._extraFilmsListComponent);
    remove(this._extraMostCommentedFilmsListComponent);
    remove(this._noMovieComponent);
    remove(this._sortingComponent);
    remove(this._loadingComponent);

    if (resetRenderedMovieCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(movieCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderNoMovies() {
    render(mainElement, this._noMovieComponent);
  }

  _renderGeneralMoviesList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const moviesCount = this._getMovies().length;

    if (moviesCount === 0) {
      this._renderNoMovies();

      return;
    }

    this._renderSort();
    render(mainElement, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);

    this._filmsListContainer = document.querySelector('.films-list__container');
    this._renderRegularMovieList();
    this._renderTopRatedList();
    this._renderMostCommentedList();
  }

  show() {
    if (!this._sortingComponent || !this._filmsContainerComponent) {
      return;
    }

    this._sortingComponent.getElement().classList.remove('visually-hidden');
    this._filmsContainerComponent.getElement().classList.remove('visually-hidden');
  }

  hide() {
    if (!this._sortingComponent || !this._filmsContainerComponent) {
      return;
    }

    this._sortingComponent.getElement().classList.add('visually-hidden');
    this._filmsContainerComponent.getElement().classList.add('visually-hidden');
  }
}
