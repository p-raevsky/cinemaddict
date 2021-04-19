import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {generateFilter} from './filter.js';
import {getRandomNumber} from './utils/common.js';

import SiteMenuPresenter from './presenter/site-menu.js';
import StatisticPresenter from './presenter/statistic.js';
import MovieListPresenter from './presenter/movie-list.js';

import {mainElement} from './constant.js';

const TOTAL_MOVIE_COUNT = 24;
const MIN_FILM_NUMBER = 100000;
const MAX_FILM_NUMBER = 150000;

const idArray = Array.from(Array(TOTAL_MOVIE_COUNT).keys());
const comments = idArray.map((id) => generateComment(id));
const movies = idArray.map((id) => generateMovie(id));
const footerStatisticNumber = getRandomNumber(MIN_FILM_NUMBER, MAX_FILM_NUMBER);
const filters = generateFilter(movies);

const siteMenuPresenter = new SiteMenuPresenter(mainElement);
siteMenuPresenter.init(filters);

const statisticPresenter = new StatisticPresenter(mainElement);
statisticPresenter.init();

const movieListPresenter = new MovieListPresenter(mainElement);
movieListPresenter.init(movies, footerStatisticNumber, comments);
