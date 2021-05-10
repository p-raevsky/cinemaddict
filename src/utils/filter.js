import {MenuItem} from '../const.js';

export const filter = {
  [MenuItem.ALL_MOVIES]: (movies) => movies,
  [MenuItem.WATHCLIST]: (movies) => movies.filter((movie) => movie.userDetails.isWatchlist),
  [MenuItem.FAVOURITES]: (movies) => movies.filter((movie) => movie.userDetails.isFavorite),
  [MenuItem.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched),
  [MenuItem.STATISTICS]: (movies) => movies,
};
