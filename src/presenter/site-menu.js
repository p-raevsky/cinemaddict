import SiteMenuView from '../view/site-menu.js';
import {render}  from '../utils/render.js';

export const FILTER = {
  ALL_MOVIES: 'All movies',
  WATHCLIST: 'Watchlist',
  FAVOURITES: 'Favorites',
  HISTORY: 'History',
};

const movieToFilterMap = {
  [FILTER.ALL_MOVIES]: (movies) => movies,
  [FILTER.WATHCLIST]: (movies) => movies.filter((movie) => movie.userDetails.isWatchlist).length,
  [FILTER.FAVOURITES]: (movies) => movies.filter((movie) => movie.userDetails.isFavorite).length,
  [FILTER.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched).length,
};

const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
export default class SiteMenu {
  constructor(container) {
    this._container = container;
    this._siteMenuComponent = null;
  }

  init(movies) {
    this._filters = generateFilter(movies);

    this._siteMenuComponent = new SiteMenuView(this._filters);

    render(this._container, this._siteMenuComponent);
  }
}
