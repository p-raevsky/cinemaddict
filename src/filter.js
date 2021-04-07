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

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
