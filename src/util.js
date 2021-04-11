import dayjs from 'dayjs';

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
  const indexes = getRandomNumbersArray(1, array.length - 1);
  const amount = getRandomNumber(1, regAmount);

  return indexes.slice(0, amount).map((element) => array[element]);
};

const generateDate = (days) => {
  const daysGap = -getRandomNumber(1, days);
  return dayjs().add(daysGap, 'day');
};

const render = (container, element) => container.append(element);

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {
  getRandomNumber,
  getRandomNumbersArray,
  getRandomArrayIndex,
  getOneElementOfArray,
  getRandomArray,
  generateDate,
  render,
  createElement
};
