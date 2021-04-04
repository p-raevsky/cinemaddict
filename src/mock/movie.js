import {
  getRandomNumber,
  getRandomNumbersArray,
  getRandomArrayIndex,
  getOneElementOfArray,
  getRandomArray,
  generateDate
} from '../util.js';

const MOVIES_AMOUNT = 24;
const REGULAR_AMOUNT = 5;
const ZERO = 0;
const ONE = 1;
const MAX_RATING = 10;
const MIN_RUNTIME = 50;
const MAX_RUNTIME = 180;

const directors = [
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

const writers = [
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

const actors = [
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

const posters = [
  'made-for-each-other',
  'popeye-meets-sinbad',
  'sagebrush-trail',
  'santa-claus-conquers-the-martians',
  'the-dance-of-life',
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
];

const titles = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm',
];

const ageRatings = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const countrys = [
  'France',
  'United States',
  'Spain',
  'Italy',
  'United Kingdom',
  'Germany',
  'Mexico',
  'Canada',
];

const descriptions = [
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

const genres = [
  'Anime',
  'Fantasy',
  'Gangster-Crime',
  'Science Fiction',
  'Western',
  'Mystery',
  'Comedy',
  'Epic',
  'Action',
  'Horror',
  'Drama',
];

const moviesIdArray = getRandomNumbersArray(ZERO, MOVIES_AMOUNT);

const generateRuntime = () => {
  const time = getRandomNumber(MIN_RUNTIME, MAX_RUNTIME);

  if (time < 60) {
    return `${time}m`;
  } else {
    const h = parseInt(time / 60);
    return `${h}h ${time - (h * 60)}m`;
  }
};

// if (description.length > MAX_LENGTH) {
//   alternativeTitle = `${description.substring(ZERO, MAX_LENGTH)}...`;
// }

export const generateMovie = () => {
  const description = getRandomArray(descriptions, REGULAR_AMOUNT).join(' ');
  const poster = `images/posters/${getOneElementOfArray(posters)}.jpg`;
  const title = getOneElementOfArray(titles);
  const alternativeTitle = `Original: ${title}`;

  return {
    id: getRandomArrayIndex(moviesIdArray),
    comments: getRandomArray(getRandomNumbersArray(ZERO, REGULAR_AMOUNT), REGULAR_AMOUNT),
    filmInfo: {
      title,
      alternativeTitle,
      totalRating: getRandomNumber(ZERO, MAX_RATING, ONE),
      poster,
      ageRating: getOneElementOfArray(ageRatings),
      director: getOneElementOfArray(directors),
      writers: getRandomArray(writers, REGULAR_AMOUNT),
      actors: getRandomArray(actors, REGULAR_AMOUNT),
      release: {
        date: generateDate(),
        releaseCountry: getOneElementOfArray(countrys),
      },
      runtime: generateRuntime(),
      genre: getRandomArray(genres, REGULAR_AMOUNT),
      description,
    },
    userDetails: {
      watchlist: Boolean(getRandomNumber(ZERO, ONE)),
      alreadyWatched: Boolean(getRandomNumber(ZERO, ONE)),
      watchingDate: generateDate(),
      favorite: Boolean(getRandomNumber(ZERO, ONE)),
    },
  };
};
