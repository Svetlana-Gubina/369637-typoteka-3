"use strict";

const fs = require(`fs`).promises;
const DEFAULT_PORT = 3000;
const mockFile = `mock.json`;
const express = require(`express`);

const app = express();

app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(mockFile);
    const posts = JSON.parse(fileContent);
    res.json(posts);
  } catch (err) {
    res.send([]);
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        console.info(err);
      }
    });
  }
};

