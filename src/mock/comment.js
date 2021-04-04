import dayjs from 'dayjs';
import {
  getRandomNumber,
  getRandomNumbersArray,
  getRandomArrayIndex,
  getOneElementOfArray
} from '../util.js';

const COMMENTS_AMOUNT = 10;
const MAX_DAYS = 365;
const ONE = 1;
const ZERO = 0;

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const authors = [
  'Tom Gordon',
  'The Flying Tomato',
  'Andre Dawson',
  'Chipper',
  'Anfernee Hardaway',
  'Pudge',
  'Daron Blaylock',
  'Macho',
  'Daryl',
  'Mr. Hockey',
];

const comments = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const commentsIdArray = getRandomNumbersArray(ZERO, COMMENTS_AMOUNT);

const generateDate = () => {
  const daysGap = -getRandomNumber(ONE, MAX_DAYS);
  return dayjs().add(daysGap, 'day').format('YYYY-MM-DD[T]HH:mm:ss');
};

export const generateComment = () => {
  return {
    id: getRandomArrayIndex(commentsIdArray),
    author: getOneElementOfArray(authors),
    comment: getOneElementOfArray(comments),
    date: generateDate(),
    emotion: getOneElementOfArray(emotions),
  };
};
