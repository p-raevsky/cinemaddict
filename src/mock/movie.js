import {
  getRandomNumber,
  getRandomNumbersArray,
  getOneElementOfArray,
  getRandomArray,
  generateDate
} from '../util.js';

const MOVIES_AMOUNT = 20;
const REGULAR_AMOUNT = 5;
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
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
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
  'Sci-Fi',
  'Western',
  'Mystery',
  'Comedy',
  'Epic',
  'Action',
  'Horror',
  'Drama',
];

const generateRuntime = () => {
  const time = getRandomNumber(MIN_RUNTIME, MAX_RUNTIME);

  if (time < 60) {
    return `${time}m`;
  } else {
    const h = parseInt(time / 60);
    return `${h}h ${time - (h * 60)}m`;
  }
};

export const generateMovie = (id) => {
  const description = getRandomArray(descriptions, REGULAR_AMOUNT).join(' ');
  const poster = `images/posters/${getOneElementOfArray(posters)}`;
  const title = getOneElementOfArray(titles);
  const alternativeTitle = title;

  return {
    id,
    comments: getRandomArray(getRandomNumbersArray(0, MOVIES_AMOUNT), REGULAR_AMOUNT),
    filmInfo: {
      title,
      alternativeTitle,
      totalRating: getRandomNumber(0, MAX_RATING, 1),
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
      genres: getRandomArray(genres, REGULAR_AMOUNT),
      description,
    },
    userDetails: {
      isWatchlist: Boolean(getRandomNumber(0, 1)),
      isAlreadyWatched: Boolean(getRandomNumber(0, 1)),
      watchingDate: generateDate(),
      isFavorite: Boolean(getRandomNumber(0, 1)),
    },
  };
};
