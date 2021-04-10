import SiteMenuView from './view/menu.js';
import ProfileView from './view/profile.js';
import SortingView from './view/sorting.js';
import FooterStatisticView from './view/footer-statistic.js';
import FilmCardView from './view/film-card.js';
import FilmsContainerView from './view/films.js';
import FilmsListView from './view/films-list.js';
import ShowMoreButtonView from './view/show-more-button.js';
import ExtraFilmsListView from './view/extra-films-list.js';
import DetailedFilmCardView from './view/detailed-film-card.js';
import StatisticView from './view/statistic.js';
import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {generateFilter} from './filter.js';
import {
  RenderPosition,
  getRandomNumber,
  render
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
    render(container, new FilmCardView(moviesArray[i]).getElement(), place);
  }
};

render(headerElement, new ProfileView(alreadyWatchedMovies).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new StatisticView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsContainerView();
render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

const films = mainElement.querySelector('.films');

const filmsListComponent = new FilmsListView();
render(films, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsList = films.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

renderFilmCards(filmsListContainer, movies, RenderPosition.BEFOREEND, FILM_COUNT);

const renderShowMoreButton = () => {
  if (movies.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = filmsList.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      movies
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((movie) => render(filmsListContainer, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

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
    ? render(films, new ExtraFilmsListView().getElement(), RenderPosition.BEFOREEND)
    : render(films, new ExtraFilmsListView(MOST_COMMENTED_TITLE).getElement(), RenderPosition.BEFOREEND);
}

const extraListContainers = films.querySelectorAll('.films-list--extra .films-list__container');
extraListContainers.forEach((list) => renderFilmCards(list, movies, RenderPosition.BEFOREEND, EXTRA_FILM_COUNT));

render(footerElement, new FooterStatisticView(footerStatisticNumber).getElement(), RenderPosition.BEFOREEND);
render(bodyElement, new DetailedFilmCardView(movies[0], comments).getElement(), RenderPosition.BEFOREEND);
