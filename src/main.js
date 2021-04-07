import {createMenuTemplate} from './view/menu.js';
import {createProfileTemplate} from './view/profile.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createExtraFilmsListTemplate} from './view/extra-films-list.js';
import {createDetailedFilmCardTemplate} from './view/detailed-film-card.js';
import {createStatisticTemplate} from './view/statistic.js';
import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {getRandomNumber} from './util.js';
import {generateFilter} from './filter.js';

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;
const TOTAL_MOVIE_COUNT = 23;
const MIN_FILM_NUMBER = 100000;
const MAX_FILM_NUMBER = 150000;
const FILM_COUNT_PER_STEP = 5;
const MOST_COMMENTED_TITLE = 'Most commented';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');

const idArray = Array.from(Array(TOTAL_MOVIE_COUNT).keys());
const comments = idArray.map((id) => generateComment(id));
const movies = idArray.map((id) => generateMovie(id));
const alreadyWatchedMovies = movies.filter((movie) => movie.userDetails.isAlreadyWatched);

const footerStatisticNumber = getRandomNumber(MIN_FILM_NUMBER, MAX_FILM_NUMBER);
const filters = generateFilter(movies);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmCards = (container, moviesArray, place, count) => {
  for (let i = 0; i < count; i++) {
    const template = createFilmCardTemplate(moviesArray[i]);
    container.insertAdjacentHTML(place, template);
  }
};

render(headerElement, createProfileTemplate(alreadyWatchedMovies), 'beforeend');
render(mainElement, createMenuTemplate(filters), 'beforeend');

render(mainElement, createStatisticTemplate(), 'beforeend');
render(mainElement, createSortingTemplate(), 'beforeend');
render(mainElement, createFilmsTemplate(), 'beforeend');

const films = mainElement.querySelector('.films');

render(films, createFilmsListTemplate(), 'beforeend');

const filmsList = films.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

renderFilmCards(filmsListContainer, movies, 'beforeend', FILM_COUNT);

const renderShowMoreButton = () => {
  if (movies.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmsList, createShowMoreButtonTemplate(), 'beforeend');

    const showMoreButton = filmsList.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      movies
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((movie) => render(filmsListContainer, createFilmCardTemplate(movie), 'beforeend'));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= movies.length) {
        showMoreButton.remove();
      }
    });
  }
};

renderShowMoreButton();

for ( let i = 1; i <= EXTRA_FILM_COUNT; i++) {
  i !== EXTRA_FILM_COUNT
    ? render(films, createExtraFilmsListTemplate(), 'beforeend')
    : render(films, createExtraFilmsListTemplate(MOST_COMMENTED_TITLE), 'beforeend');
}

const extraListContainers = films.querySelectorAll('.films-list--extra .films-list__container');
extraListContainers.forEach((list) => renderFilmCards(list, movies, 'beforeend', EXTRA_FILM_COUNT));

render(footerElement, createFooterStatisticTemplate(footerStatisticNumber), 'beforeend');

render(bodyElement, createDetailedFilmCardTemplate(movies[0], comments), 'beforeend');
