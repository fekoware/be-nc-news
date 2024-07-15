const { fetchArticleById } = require("../models/articles.models");

const getArticleById = (req, res, next) => {
    console.log(req.params, "REQUEST in the controller")
  const { article_id } = req.params;
  console.log("inside article controller");

  fetchArticleById(article_id)
    .then((article) => {
      console.log(article, "article in controller after model fetch");
      res.status(200).send({ article });
    }).catch((err) => {
        console.log(err)
        next(err)
    })
    
};

module.exports = { getArticleById };
