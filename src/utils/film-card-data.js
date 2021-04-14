import dayjs from 'dayjs';
import {getRandomNumber} from './common.js';

export const generateDate = (days) => {
  const daysGap = -getRandomNumber(1, days);
  return dayjs().add(daysGap, 'day');
};
