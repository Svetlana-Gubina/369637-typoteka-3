'use strict';

const express = require(`express`);
const DEFAULT_PORT = 8080;
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const app = express();

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);

