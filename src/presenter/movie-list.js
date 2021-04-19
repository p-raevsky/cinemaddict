import {bodyElement, mainElement} from '../constant.js';
import {render, remove}  from '../utils/render.js';
import {updateItem} from '../utils/common.js';

import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ExtraFilmsListView from '../view/extra-films-list.js';
import NoMovieView from '../view/no-movie.js';
import SortingView from '../view/sorting.js';

import FooterStatisticPresenter from '../presenter/footer-Statistic.js';
import ProfilePresenter from '../presenter/profile.js';
import MoviePresenter from '../presenter/movie.js';

const ZERO = 0;
const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED_TITLE = 'Most commented';

const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');

export default class MovieList {
  constructor(container) {
    this._container = container;

    this._noMovieViewComponent = new NoMovieView();
    this._sortingViewComponent = new SortingView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._extraFilmsListComponent = new ExtraFilmsListView();
    this._extraMostCommentedFilmsListComponent = null;
    this._filmsListContainer = null;
    this._topRatedListContainer = null;
    this._mostCommentedContainer = null;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmCardPresenter = {};
    this._topRatedFilmCardPresenter = {};
    this._mostCommentedFilmCardPresenter = {};

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
  }

  init(movies, totalMovieCount, comments) {
    this._movies = movies.slice();
    this._comments = comments.slice();

    if (!this._movies.length) {
      this._renderNoMovies();
      this._renderFooterStatistic(ZERO);

      return;
    }

    this._renderProfile(this._movies);
    this._renderSort();
    this._renderGeneralMoviesList();
    this._renderFooterStatistic(totalMovieCount);
  }

  _handleFilmCardChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._filmCardPresenter[updatedMovie.id].init(updatedMovie);
    this._topRatedFilmCardPresenter[updatedMovie.id].init(updatedMovie);
    this._mostCommentedFilmCardPresenter[updatedMovie.id].init(updatedMovie);
  }

  _renderProfile(movies) {
    const profilePresenter = new ProfilePresenter(headerElement);
    profilePresenter.init(movies);
  }

  _renderFooterStatistic(totalMovieCount) {
    const footerStatisticPresenter = new FooterStatisticPresenter(footerElement);
    footerStatisticPresenter.init(totalMovieCount);
  }

  _renderSort() {
    render(mainElement, this._sortingViewComponent);
  }

  _renderMovie(container, movie, comments) {
    const moviePresenter = new MoviePresenter(container);
    moviePresenter.init(movie, comments);

    return moviePresenter;
  }

  _renderRegularMovieList(movies, container, count, comments) {
    for (let i = 0; i < count; i++) {
      const presenter = this._renderMovie(container, movies[i], comments);
      this._filmCardPresenter[movies[i].id] = presenter;
    }
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
  }

  _renderNoMovies() {
    render(mainElement, this._noMovieViewComponent);
  }

  _renderShowMoreButton() {
    if (this._movies.length > FILM_COUNT_PER_STEP) {

      render(this._filmsListComponent, this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    }
  }

  _handleShowMoreButtonClick() {
    this._movies
      .slice(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((movie) => {
        const presenter = this._renderMovie(this._filmsListContainer, movie, this._comments);
        this._filmCardPresenter[movie.id] = presenter;
      });

    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderTopRatedList(movies) {
    render(this._filmsContainerComponent, this._extraFilmsListComponent);
    this._topRatedListContainer = this._extraFilmsListComponent.getElement().querySelector('.films-list--extra .films-list__container');

    movies
      .filter((movie) => movie.filmInfo.totalRating)
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, EXTRA_FILM_COUNT)
      .forEach((movie) => {
        const presenter = this._renderMovie(this._topRatedListContainer, movie, this._comments);
        this._topRatedFilmCardPresenter[movie.id] = presenter;
      });
  }

  _renderMostCommentedList(movies) {
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
        const presenter = this._renderMovie(this._mostCommentedContainer, movie, this._comments);
        this._mostCommentedFilmCardPresenter[movie.id] = presenter;
      });
  }

  _renderGeneralMoviesList() {
    render(mainElement, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);

    this._filmsListContainer = document.querySelector('.films-list__container');
    this._renderRegularMovieList(this._movies, this._filmsListContainer, FILM_COUNT, this._comments);
    this._renderShowMoreButton();
    this._renderTopRatedList(this._movies);
    this._renderMostCommentedList(this._movies);
  }
}
