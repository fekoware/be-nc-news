const {
  fetchArticles,
  fetchArticleById,
} = require("../models/articles.models");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  const order = req.query.order;

  fetchArticles(order)
    .then((articles) => {
      articles.forEach((article) => {
        delete article.body;
      });

      res.status(200).send({ articles });
    })
    .catch((err) => {

      next(err);
    });
};

module.exports = { getArticles, getArticleById };
