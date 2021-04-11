import SiteMenuView from './view/site-menu.js';
import ProfileView from './view/profile.js';
import SortingView from './view/sorting.js';
import FooterStatisticView from './view/footer-statistic.js';
import FilmCardView from './view/film-card.js';
import FilmsContainerView from './view/films-container.js';
import FilmsListView from './view/films-list.js';
import ShowMoreButtonView from './view/show-more-button.js';
import ExtraFilmsListView from './view/extra-films-list.js';
import DetailedFilmCardView from './view/detailed-film-card.js';
import StatisticView from './view/statistic.js';
import NoMovieView from './view/no-movie.js';
import {generateMovie} from './mock/movie.js';
import {generateComment} from './mock/comment.js';
import {generateFilter} from './filter.js';
import {
  getRandomNumber,
  render
} from './util.js';

const ZERO = 0;
const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;
const TOTAL_MOVIE_COUNT = 24;
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

const renderFilmCard = (container, movie) => {
  const filmCardComponent =  new FilmCardView(movie);

  filmCardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    renderDetailedFilmCard(movie);
  });

  filmCardComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    renderDetailedFilmCard(movie);
  });

  filmCardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    renderDetailedFilmCard(movie);
  });

  render(container, filmCardComponent.getElement());
};

const renderDetailedFilmCard = (movie) => {
  const detailedFilmCardComponent = new DetailedFilmCardView(movie, comments);

  detailedFilmCardComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();

    bodyElement.removeChild(detailedFilmCardComponent.getElement());
    bodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', onDocumentKeydown);
  });

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      bodyElement.removeChild(detailedFilmCardComponent.getElement());
      bodyElement.classList.remove('hide-overflow');

      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  render(bodyElement, detailedFilmCardComponent.getElement());
  bodyElement.classList.add('hide-overflow');

  document.addEventListener('keydown', onDocumentKeydown);
};

const renderFilmCards = (container, moviesArray, count) => {
  for (let i = 0; i < count; i++) {
    renderFilmCard(container, moviesArray[i]);
  }
};

render(mainElement, new SiteMenuView(filters).getElement());
render(mainElement, new StatisticView().getElement());

if (!movies.length) {
  render(mainElement, new NoMovieView().getElement());

  render(footerElement, new FooterStatisticView(ZERO).getElement());
} else {
  render(headerElement, new ProfileView(alreadyWatchedMovies).getElement());
  render(mainElement, new SortingView().getElement());

  const filmsComponent = new FilmsContainerView();
  render(mainElement, filmsComponent.getElement());

  const films = mainElement.querySelector('.films');

  const filmsListComponent = new FilmsListView();
  render(films, filmsListComponent.getElement());

  const filmsList = films.querySelector('.films-list');
  const filmsListContainer = filmsList.querySelector('.films-list__container');

  renderFilmCards(filmsListContainer, movies, FILM_COUNT);

  const renderShowMoreButton = () => {
    if (movies.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP;

      render(filmsList, new ShowMoreButtonView().getElement());

      const showMoreButton = filmsList.querySelector('.films-list__show-more');

      showMoreButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        movies
          .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
          .forEach((movie) => renderFilmCard(filmsListContainer, movie));

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
      ? render(films, new ExtraFilmsListView().getElement())
      : render(films, new ExtraFilmsListView(MOST_COMMENTED_TITLE).getElement());
  }

  const extraListContainers = films.querySelectorAll('.films-list--extra .films-list__container');
  extraListContainers.forEach((list) => renderFilmCards(list, movies, EXTRA_FILM_COUNT));

  render(footerElement, new FooterStatisticView(footerStatisticNumber).getElement());
}
