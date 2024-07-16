const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId
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

const getCommentsByArticleId = (req, res, next) => {
    const article_id  = req.params.article_id;
    console.log("inside controller")
    fetchCommentsByArticleId(article_id).then((comment) => {
        console.log(comment)
        res.status(200).send({comment})
    }).catch((err) => {
        console.log(err);
        next(err);
    })

} 

module.exports = { getCommentsByArticleId, getArticles, getArticleById };
