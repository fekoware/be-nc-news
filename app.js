const express = require("express");
const db = require("./db/connection");
const { getTopics } = require("./controllers/topics.controller");
const endpoints = require("./endpoints.json");
const { getArticleById } = require("./controllers/articles.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", (req, res, next) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/articles/:article_id", getArticleById);

//error handling
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }
  next(err);

  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  }
  next(err);
});

module.exports = app;
