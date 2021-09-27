"use strict";

const DateGenerator = require(`random-date-generator`);

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * i);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
};

const getRandomDate = () => {
  let startDate = new Date(2021, 6, 1);
  let endDate = new Date();

  return DateGenerator.getRandomDateInRange(startDate, endDate);
};

module.exports = {
  getRandomInteger,
  shuffle,
  getRandomDate
};
