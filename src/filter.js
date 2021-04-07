const movieToFilterMap = {
  'All movies': (movies) => movies,
  'Watchlist': (movies) => movies.filter((movie) => movie.userDetails.isWatchlist).length,
  'Favorites': (movies) => movies.filter((movie) => movie.userDetails.isFavorite).length,
  'History': (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
