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

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmCards = (container, template, place, count) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

render(headerElement, createProfileTemplate(), 'beforeend');
render(mainElement, createMenuTemplate(), 'beforeend');
// Временно закоментировал.
// render(mainElement, createStatisticTemplate(), 'beforeend');
render(mainElement, createSortingTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const films = mainElement.querySelector('.films');

render(films, createFilmsListTemplate(), 'beforeend');

const filmsList = films.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

renderFilmCards(filmsListContainer, createFilmCardTemplate(), 'beforeend', FILM_COUNT);
render(filmsList, createShowMoreButtonTemplate(), 'beforeend');
render(films, createTopFilmsListTemplate(), 'beforeend');

const topFilmsListContainer = films.querySelector('.films-list--top .films-list__container');

renderFilmCards(topFilmsListContainer, createFilmCardTemplate(), 'beforeend', EXTRA_FILM_COUNT);
render(films, createMostCommentedFilmsListTemplate(), 'beforeend');

const mostCommentedFilmsListContainer = films.querySelector('.films-list--comment .films-list__container');

renderFilmCards(mostCommentedFilmsListContainer, createFilmCardTemplate(), 'beforeend', EXTRA_FILM_COUNT);
render(footerElement, createFooterStatisticTemplate(), 'beforeend');

// Временно закоментировал.
// render(bodyElement, createDetailedFilmCardTemplate(), 'beforeend');
