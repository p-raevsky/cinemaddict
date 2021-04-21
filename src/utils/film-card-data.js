import dayjs from 'dayjs';
import {getRandomNumber} from './common.js';

export const generateDate = (days) => {
  const daysGap = -getRandomNumber(1, days);
  return dayjs().add(daysGap, 'day');
};

export const sortMovieByDate = (movieA, movieB) => {
  const dateA = dayjs(movieA.filmInfo.release.date);
  const dateB = dayjs(movieB.filmInfo.release.date);

  return dateB.diff(dateA);
};

export const sortMovieByRating = (movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;
