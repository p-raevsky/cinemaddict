import {bodyElement, mainElement} from './elements.js';
import {MenuItem, UpdateType} from './const.js';

import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {getRandomNumber} from './utils/common.js';

import StatisticView from './view/statistic.js';

import ProfilePresenter from './presenter/profile.js';
import SiteMenuPresenter from './presenter/site-menu.js';
import MovieListPresenter from './presenter/movie-list.js';
import FooterStatisticPresenter from './presenter/footer-statistic.js';

import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filter.js';
import {remove, render} from './utils/render.js';

const TOTAL_MOVIE_COUNT = 24;
const MIN_FILM_NUMBER = 100000;
const MAX_FILM_NUMBER = 150000;

const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');

const idArray = Array.from(Array(TOTAL_MOVIE_COUNT).keys());
const comments = idArray.map((id) => generateComment(id));
const movies = idArray.map((id) => generateMovie(id));
const totalMovieCount = getRandomNumber(MIN_FILM_NUMBER, MAX_FILM_NUMBER);

const moviesModel = new MoviesModel();
moviesModel.set(movies);

const commentsModel = new CommentsModel();
commentsModel.set(comments);

const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(headerElement, moviesModel);
const siteMenuPresenter = new SiteMenuPresenter(mainElement, filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(mainElement, moviesModel, commentsModel, filterModel);
const footerStatisticPresenter = new FooterStatisticPresenter(footerElement, moviesModel, totalMovieCount);

profilePresenter.init();
siteMenuPresenter.init();
movieListPresenter.init();
footerStatisticPresenter.init();

let statisticsComponent = null;

const handleMenuItemClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS:
      filterModel.set(UpdateType.MAJOR, MenuItem.STATISTICS);
      siteMenuPresenter.toggleMenuItem(menuItem);
      statisticsComponent = new StatisticView(moviesModel.get());
      render(mainElement, statisticsComponent);
      movieListPresenter.hide();
      break;

    default:
      siteMenuPresenter.toggleMenuItem(menuItem);
      remove(statisticsComponent);
      movieListPresenter.show();
      break;
  }
};

const mainNavigation = document.querySelector('.main-navigation');

mainNavigation.addEventListener('click', (evt) => {
  evt.preventDefault();
  const menuItemType = evt.target.dataset.type;
  handleMenuItemClick(menuItemType);
});
