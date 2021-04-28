import {bodyElement, mainElement} from './elements.js';

import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {getRandomNumber} from './utils/common.js';

import ProfilePresenter from './presenter/profile.js';
import SiteMenuPresenter from './presenter/site-menu.js';
import StatisticPresenter from './presenter/statistic.js';
import MovieListPresenter from './presenter/movie-list.js';
import FooterStatisticPresenter from './presenter/footer-statistic.js';

import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments';

const TOTAL_MOVIE_COUNT = 25;
const MIN_FILM_NUMBER = 100000;
const MAX_FILM_NUMBER = 150000;

const headerElement = bodyElement.querySelector('.header');
const footerElement = bodyElement.querySelector('.footer');

const idArray = Array.from(Array(TOTAL_MOVIE_COUNT).keys());
const comments = idArray.map((id) => generateComment(id));
const movies = idArray.map((id) => generateMovie(id));
const totalMovieCount = getRandomNumber(MIN_FILM_NUMBER, MAX_FILM_NUMBER);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const profilePresenter = new ProfilePresenter(headerElement, moviesModel);
profilePresenter.init();

const siteMenuPresenter = new SiteMenuPresenter(mainElement, moviesModel);
siteMenuPresenter.init();

const statisticPresenter = new StatisticPresenter(mainElement, moviesModel);
statisticPresenter.init();

const movieListPresenter = new MovieListPresenter(mainElement, moviesModel, commentsModel);
movieListPresenter.init();

const footerStatisticPresenter = new FooterStatisticPresenter(footerElement);
footerStatisticPresenter.init(totalMovieCount);
