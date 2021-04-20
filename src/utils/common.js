const getRandomArrayIndex = (array) => {
  return getRandomNumber(0, array.length - 1);
};

export const getRandomNumber = (minNumber, maxNumber, float = 0) => {
  return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float);
};

export const getRandomNumbersArray = (minNumber, maxNumber) => {
  const array = [];

  while (array.length < maxNumber) {
    const item = getRandomNumber(minNumber, maxNumber);

    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }

  return array;
};

export const  getOneElementOfArray = (array) => {
  return array[getRandomArrayIndex(array)];
};

export const  getRandomArray = (array, regAmount) => {
  const indexes = getRandomNumbersArray(1, array.length - 1);
  const amount = getRandomNumber(1, regAmount);

  return indexes.slice(0, amount).map((element) => array[element]);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
