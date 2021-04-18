import {bodyElement, mainElement} from '../constant.js';
import {render, remove}  from '../utils/render.js';
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

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(movies, totalMovieCount, comments, sortedTopRatedMovies, sortedMostCommentedMovies) {
    this._movies = movies.slice();
    this._comments = comments.slice();

    if (!this._movies.length) {
      this._renderNoMovies();
      this._renderFooterStatistic(ZERO);

      return;
    }

    this._renderProfile(this._movies);
    this._renderSort();
    this._renderGeneralMoviesList(sortedTopRatedMovies, sortedMostCommentedMovies);
    this._renderFooterStatistic(totalMovieCount);
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
  }

  _renderMovies(movies, container, count, comments) {
    for (let i = 0; i < count; i++) {
      this._renderMovie(container, movies[i], comments);
    }
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
      .forEach((movie) => this._renderMovie(this._filmsListContainer, movie, this._comments));

    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderTopRatedList(sortedMovies) {
    render(this._filmsContainerComponent, this._extraFilmsListComponent);
    this._topRatedListContainer = this._extraFilmsListComponent.getElement().querySelector('.films-list--extra .films-list__container');
    this._renderMovies(sortedMovies, this._topRatedListContainer, EXTRA_FILM_COUNT, this._comments);
  }

  _renderMostCommentedList(sortedMovies) {
    this._extraMostCommentedFilmsListComponent = new ExtraFilmsListView(MOST_COMMENTED_TITLE);
    render(this._filmsContainerComponent, this._extraMostCommentedFilmsListComponent);
    this._mostCommentedContainer = this._extraMostCommentedFilmsListComponent.getElement().querySelector('.films-list--extra .films-list__container');

    this._renderMovies(sortedMovies, this._mostCommentedContainer, EXTRA_FILM_COUNT, this._comments);
  }

  _renderGeneralMoviesList(sortedTopRatedMovies, sortedMostCommentedMovies) {
    render(mainElement, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);

    this._filmsListContainer = document.querySelector('.films-list__container');
    this._renderMovies(this._movies, this._filmsListContainer, FILM_COUNT, this._comments);
    this._renderShowMoreButton();
    this._renderTopRatedList(sortedTopRatedMovies);
    this._renderMostCommentedList(sortedMostCommentedMovies);
  }
}
