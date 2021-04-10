import SiteMenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import SortingView from './view/sorting.js';
import {createFooterStatisticTemplate} from './view/footer-statistic.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createExtraFilmsListTemplate} from './view/extra-films-list.js';
import DetailedFilmCardView from './view/detailed-film-card.js';
import {createStatisticTemplate} from './view/statistic.js';
import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {generateFilter} from './filter.js';
import {
  RenderPosition,
  getRandomNumber,
  renderTemplate,
  renderElement
} from './util.js';

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

const renderFilmCards = (container, moviesArray, place, count) => {
  for (let i = 0; i < count; i++) {
    renderTemplate(container, createFilmCardTemplate(moviesArray[i]), place);
  }
};

renderElement(headerElement, new ProfileView(alreadyWatchedMovies).getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);

renderTemplate(mainElement, createStatisticTemplate(), 'beforeend');
renderElement(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFilmsTemplate(), 'beforeend');

const films = mainElement.querySelector('.films');

renderTemplate(films, createFilmsListTemplate(), 'beforeend');

const filmsList = films.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

renderFilmCards(filmsListContainer, movies, 'beforeend', FILM_COUNT);

const renderShowMoreButton = () => {
  if (movies.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    renderTemplate(filmsList, createShowMoreButtonTemplate(), 'beforeend');

    const showMoreButton = filmsList.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      movies
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((movie) => renderTemplate(filmsListContainer, createFilmCardTemplate(movie), 'beforeend'));

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
    ? renderTemplate(films, createExtraFilmsListTemplate(), 'beforeend')
    : renderTemplate(films, createExtraFilmsListTemplate(MOST_COMMENTED_TITLE), 'beforeend');
}

const extraListContainers = films.querySelectorAll('.films-list--extra .films-list__container');
extraListContainers.forEach((list) => renderFilmCards(list, movies, 'beforeend', EXTRA_FILM_COUNT));

renderTemplate(footerElement, createFooterStatisticTemplate(footerStatisticNumber), 'beforeend');
renderElement(bodyElement, new DetailedFilmCardView(movies[0], comments).getElement(), RenderPosition.BEFOREEND);
