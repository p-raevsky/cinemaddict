import {createMenuTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/profile.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createTopFilmsListTemplate} from './view/top-rated-films-list.js';
import {createMostCommentedFilmsListTemplate} from './view/most-commented-films-list.js';
import {createDetailedFilmCardTemplate} from './view/detailed-film-card.js';
import {createStatisticTemplate} from './view/statistic.js';
import {generateMovie} from './mock/movie.js';

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;
const MOVIES_TOTAL_AMOUNT = 20;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const movies = new Array(MOVIES_TOTAL_AMOUNT).fill().map(generateMovie);

const renderFilmCards = (container, moviesArray, place, count) => {
  for (let i = 0; i < count; i++) {
    const template = createFilmCardTemplate(moviesArray[i]);
    container.insertAdjacentHTML(place, template);
  }
};

render(headerElement, createProfileTemplate(), 'beforeend');
render(mainElement, createMenuTemplate(), 'beforeend');

render(mainElement, createStatisticTemplate(), 'beforeend');
render(mainElement, createSortingTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const films = mainElement.querySelector('.films');

render(films, createFilmsListTemplate(), 'beforeend');

const filmsList = films.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

renderFilmCards(filmsListContainer, movies, 'beforeend', FILM_COUNT);
render(filmsList, createShowMoreButtonTemplate(), 'beforeend');
render(films, createTopFilmsListTemplate(), 'beforeend');

const topFilmsListContainer = films.querySelector('.films-list--top .films-list__container');

renderFilmCards(topFilmsListContainer, movies, 'beforeend', EXTRA_FILM_COUNT);
render(films, createMostCommentedFilmsListTemplate(), 'beforeend');

const mostCommentedFilmsListContainer = films.querySelector('.films-list--comment .films-list__container');

renderFilmCards(mostCommentedFilmsListContainer, movies, 'beforeend', EXTRA_FILM_COUNT);
render(footerElement, createFooterStatisticTemplate(), 'beforeend');

render(bodyElement, createDetailedFilmCardTemplate(), 'beforeend');
