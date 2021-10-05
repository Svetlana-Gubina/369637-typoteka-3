"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInteger,
  shuffle,
  getRandomDate
} = require(`./utils`);
const DEFAULT_COUNT = 1;
const MAX_ELEMENTS = 1000;
const FILE_NAME = `mock.json`;
const OVERFLOW_MESSAGE = `Не больше ${MAX_ELEMENTS} публикаций`;

const TITLES_PATH = `./data/titles.txt`;
const CATEGORIES_PATH = `./data/categories.txt`;
const ANNOUNCE_PATH = `./data/announce.txt`;

const readFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter((contentItem) => contentItem.trim() !== ``);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const createMockData = (count, [titles, categories, announce]) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      title: titles[getRandomInteger(0, titles.length - 1)],
      announce: shuffle(announce).slice(0, getRandomInteger(1, 5)).join(` `),
      fullText: shuffle(announce).slice(0, getRandomInteger(1, announce.length - 1)).join(` `),
      createdDate: getRandomDate(),
      сategory: shuffle(categories).slice(0, getRandomInteger(1, categories.length - 1)),
    });
  }

  return result;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const options = await Promise.all([readFile(TITLES_PATH), readFile(CATEGORIES_PATH), readFile(ANNOUNCE_PATH)]);

    if (countOffer > MAX_ELEMENTS) {
      console.info(OVERFLOW_MESSAGE);
      process.exit(ExitCode.error);
    }

    try {
      const data = JSON.stringify(createMockData(countOffer, options));
      await fs.writeFile(FILE_NAME, data);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Error!`));
    }
  }
};
