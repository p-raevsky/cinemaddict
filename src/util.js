import dayjs from 'dayjs';

const MAX_DAYS = 18250;
const ONE = 1;

const getRandomNumber = (minNumber, maxNumber, float = 0) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float);
};

const getRandomNumbersArray = (minNumber, maxNumber) => {
  const array = [];

  while (array.length < maxNumber) {
    const item = getRandomNumber(minNumber, maxNumber);

    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  return array;
};

const getRandomArrayIndex = (array) => {
  return getRandomNumber(0, array.length - 1);
};

const  getOneElementOfArray = (array) => {
  return array[getRandomArrayIndex(array)];
};

const  getRandomArray = (array, regAmount) => {
  const indexes = getRandomNumbersArray(ONE, array.length - 1);
  const amount = getRandomNumber(ONE, regAmount);

  return indexes.slice(0, amount).map((element) => array[element]);
};

const generateDate = () => {
  const daysGap = -getRandomNumber(ONE, MAX_DAYS);
  return dayjs().add(daysGap, 'day').format('DD MMMM YYYY');
};

export {
  getRandomNumber,
  getRandomNumbersArray,
  getRandomArrayIndex,
  getOneElementOfArray,
  getRandomArray,
  generateDate
};
