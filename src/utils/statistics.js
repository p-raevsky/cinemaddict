import dayjs from 'dayjs';
import {TimeRange} from '../const.js';

export const filterWatchedMoviesInRange = ({movies, range}) => {
  if (range === TimeRange.ALL_TIME) {
    return movies;
  }

  return movies.filter((movie) => {
    const dateNow = dayjs();
    return dayjs(movie.userDetails.watchingDate).isSame(dateNow, range);
  });
};

export const makeItemsUniq = (items) => [...new Set(items)];

export const countMoviesByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.filmInfo.genres.includes(genre)).length;
};
