const db = require("../db/connection");

const fetchArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ message: "404 - Bad Request", status: 404 });
      }

      return result.rows[0];
    });
};

const fetchArticles = (order = "desc") => {
  const allowedOrders = ["asc", "desc"];

  if (!allowedOrders.includes(order)) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  return db
    .query(
      `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count from articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at ${order};`
    )
    .then((result) => {
      console.log(result.rows, "in model");
      return result.rows;
    })
    .catch((err) => {
      console.log(err, "model error");
    });

  //query the database for all comments from articles
  // create a counter
  // if comments article_id = article id, add 1 to the counter
  //create property called comment count in each new article object
  // add comment count to property
  // return back to the controller
};

const fetchCommentsByArticleId = (articleId, order = "desc") => {
  const allowedOrders = ["asc", "desc"];

  if (!allowedOrders.includes(order)) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  return db
    .query(
      `SELECT * from comments WHERE article_id = $1 ORDER BY created_at ${order}`,
      [articleId]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ message: "Bad Request", status: 400 });
      }
      return result.rows;
    });
};

module.exports = { fetchCommentsByArticleId, fetchArticles, fetchArticleById };
