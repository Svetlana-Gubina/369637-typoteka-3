"use strict";

const fs = require(`fs`).promises;
const http = require(`http`);
const chalk = require(`chalk`);
const DEFAULT_PORT = 3000;
const mockFile = `mock.json`;
const {HttpCode} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run(args) {
    const [portNum] = args;
    const port = Number.parseInt(portNum, 10) || DEFAULT_PORT;

    const onServerCreate = async (req, res) => {
      const notFoundMessage = `Not found`;

      const getResponse = (response, httpCode, message) => {
        const template = `<!DOCTYPE html>
        <html lang="ru">
        <head>
        <title>Hello from node</title>
        </head>
        <body>
        ${message}
        </body></html>`.trim();

        response.writeHead(httpCode, {
          "Content-type": `text/html; charset=UTF-8 `
        });

        response.end(template);
      };

      switch (req.url) {
        case `/`:
          const content = await fs.readFile(mockFile);
          const items = JSON.parse(content);
          const message = items.map((item) => `<li>${item}</li>`.join(``));
          getResponse(res, HttpCode.OK, `<ul><li>Заголовок публикации</li>${message}</ul>`);
          break;
        default:
          getResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
          break;
      }
    };

    const httpServer = http.createServer(onServerCreate);
    httpServer.listen(port)
              .on(`listening`, (err) => {
                if (err) {
                  console.error(chalk.red(err));
                }
                console.info(chalk.green(`Ожидаю соединений на ${port}`));
              })
              .on(`error`, ({message}) => {
                console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
              });
  }
};
