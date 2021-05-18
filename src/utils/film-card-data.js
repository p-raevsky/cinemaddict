import dayjs from 'dayjs';

const MINUTES_IN_ONE_HOUR = 60;

export const sortMovieByDate = (movieA, movieB) => {
  const dateA = dayjs(movieA.filmInfo.release.date);
  const dateB = dayjs(movieB.filmInfo.release.date);

  return dateB.diff(dateA);
};

export const sortMovieByRating = (movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;

export const generateRuntime = (time) => {
  if (time < MINUTES_IN_ONE_HOUR) {
    return `${time}m`;
  }

  const h = parseInt(time / MINUTES_IN_ONE_HOUR);

  return `${h}h ${time - (h * MINUTES_IN_ONE_HOUR)}m`;
};
