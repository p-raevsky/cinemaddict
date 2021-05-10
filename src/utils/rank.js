import {Rank} from '../const.js';

export const rank = {
  [Rank.NOVICE]: (count) => count <= 10,
  [Rank.FAN]: (count) => count <= 20 && count > 10,
  [Rank.MOVIE_BUFF]: (count) => count > 20,
};

export const getRankName = (movies) => {
  const alreadyWatchedMovies = movies.filter((movie) => movie.userDetails.isAlreadyWatched);
  const watchedMoviesAmount = alreadyWatchedMovies.length;
  const [rankName] = Object.entries(rank)
    .filter(([, rankCount]) => rankCount(watchedMoviesAmount))
    .flat();

  return rankName;
};
