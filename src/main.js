import {bodyElement, mainElement} from './elements.js';
import {MenuItem, UpdateType} from './const.js';

import Api from './api.js';

import StatisticView from './view/statistic.js';

import ProfilePresenter from './presenter/profile.js';
import SiteMenuPresenter from './presenter/site-menu.js';
import MovieListPresenter from './presenter/movie-list.js';
import FooterStatisticsPresenter from './presenter/footer-statistics.js';

import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import {remove, render} from './utils/render.js';

const AUTHORIZATION = 'Basic ZXCASDqwe123';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(headerElement, moviesModel);
const siteMenuPresenter = new SiteMenuPresenter(mainElement, filterModel, moviesModel);
const movieListPresenter = new MovieListPresenter(mainElement, moviesModel, filterModel, api);
const footerStatisticsPresenter = new FooterStatisticsPresenter(footerElement, moviesModel);

siteMenuPresenter.init();
movieListPresenter.init();

let statisticsComponent = null;

api.getMovies()
  .then((movies) => {
    moviesModel.set(UpdateType.INIT, movies);
    profilePresenter.init();
    footerStatisticsPresenter.init();

    siteMenuPresenter.getMainNavigationContainer()
      .addEventListener('click', siteMenuClickHandler);
  })
  .catch(() => {
    moviesModel.set(UpdateType.INIT, []);
    profilePresenter.init();
    footerStatisticsPresenter.init();

    siteMenuPresenter.getMainNavigationContainer()
      .addEventListener('click', siteMenuClickHandler);
  });

const siteMenuClickHandler = (evt) => {
  if (evt.target.closest('a')) {
    evt.preventDefault();
    const menuItemType = evt.target.dataset.type;
    handleMenuItemClick(menuItemType);
  }
};

const handleMenuItemClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.STATISTICS:
      filterModel.set(UpdateType.MAJOR, MenuItem.STATISTICS);
      siteMenuPresenter.toggleMenuItem(menuItem);
      remove(statisticsComponent);
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
