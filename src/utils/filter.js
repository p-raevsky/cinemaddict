import {FILTER} from '../const.js';

export const movieToFilterMap = {
  [FILTER.ALL_MOVIES]: (movies) => movies,
  [FILTER.WATHCLIST]: (movies) => movies.filter((movie) => movie.userDetails.isWatchlist),
  [FILTER.FAVOURITES]: (movies) => movies.filter((movie) => movie.userDetails.isFavorite),
  [FILTER.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched),
};
