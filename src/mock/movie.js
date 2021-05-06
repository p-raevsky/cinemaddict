import {
  getRandomNumber,
  getRandomNumbersArray,
  getOneElementOfArray,
  getRandomArray
} from '../utils/common.js';
import {generateDate} from '../utils/film-card-data.js';

const MOVIES_AMOUNT = 24;
const REGULAR_AMOUNT = 5;
const MAX_RATING = 10;
const MIN_RUNTIME = 50;
const MAX_RUNTIME = 180;
const RELEASE_DATE_GAP = 10000;
const WATCHING_DATE_GAP = 365;

const DIRECTORS = [
  'Jon Favreau',
  'Tim Burton',
  'J. J. Abrams',
  'Christopher Nolan',
  'David Yates',
  'James Cameron',
  'Michael Bay',
  'Peter Jackson',
  'Steven Spielberg',
];

const WRITERS = [
  'Billy Wilder',
  'Ethan Coen',
  'Amy Holden Jones',
  'Charlie Kaufman',
  'Steven De Souza',
  'Woody Allen',
  'Oliver Stone',
  'Callie Khouri',
  'Aaron Sorkin',
  'Spike Lee',
  'Stanley Kubrick',
];

const ACTORS = [
  'Harrison Ford',
  'Charlize Theron',
  'Gregory Peck',
  'Amy Adams',
  'Brie Larson',
  'Octavia Spencer',
  'Leonardo DiCaprio',
  'Peter O’Toole',
  'Viola Davis',
  'Sean Penn',
  'Natalie Portman',
  'Michael Caine',
  'Charlie Chaplin',
  'Emma Stone',
  'Al Pacino',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const TITLES = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm',
];

const AGE_RATINGS = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const COUNTRYS = [
  'France',
  'United States',
  'Spain',
  'Italy',
  'United Kingdom',
  'Germany',
  'Mexico',
  'Canada',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const GENRES = [
  'Anime',
  'Fantasy',
  'Sci-Fi',
  'Western',
  'Mystery',
  'Comedy',
  'Epic',
  'Action',
  'Horror',
  'Drama',
];

export const generateMovie = (id) => {
  const description = getRandomArray(DESCRIPTIONS, REGULAR_AMOUNT).join(' ');
  const poster = `images/posters/${getOneElementOfArray(POSTERS)}`;
  const title = getOneElementOfArray(TITLES);
  const alternativeTitle = title;

  return {
    id,
    comments: getRandomArray(getRandomNumbersArray(0, MOVIES_AMOUNT - 1), REGULAR_AMOUNT),
    filmInfo: {
      title,
      alternativeTitle,
      totalRating: getRandomNumber(0, MAX_RATING, 1),
      poster,
      ageRating: getOneElementOfArray(AGE_RATINGS),
      director: getOneElementOfArray(DIRECTORS),
      writers: getRandomArray(WRITERS, REGULAR_AMOUNT),
      actors: getRandomArray(ACTORS, REGULAR_AMOUNT),
      release: {
        date: generateDate(RELEASE_DATE_GAP),
        releaseCountry: getOneElementOfArray(COUNTRYS),
      },
      runtime: getRandomNumber(MIN_RUNTIME, MAX_RUNTIME),
      genres: getRandomArray(GENRES, REGULAR_AMOUNT),
      description,
    },
    userDetails: {
      isWatchlist: Boolean(getRandomNumber(0, 1)),
      isAlreadyWatched: Boolean(getRandomNumber(0, 1)),
      watchingDate: generateDate(WATCHING_DATE_GAP),
      isFavorite: Boolean(getRandomNumber(0, 1)),
    },
  };
};
