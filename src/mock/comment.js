import {
  getOneElementOfArray,
  generateDate
} from '../util.js';

const DAYS_GAP = 365;

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const AUTHORS = [
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

const COMMENTS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const generateComment = (id) => {
  return {
    id,
    author: getOneElementOfArray(AUTHORS),
    comment: getOneElementOfArray(COMMENTS),
    date: generateDate(DAYS_GAP),
    emotion: getOneElementOfArray(EMOTIONS),
  };
};
