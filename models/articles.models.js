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

const insertComment = (username, body, article_id) => {
    return db.query(`INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3) RETURNING *`, [username, body, article_id]).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ message: "Bad Request", status: 404 });
          }
        return result.rows[0]
    })
}

module.exports = {
  fetchCommentsByArticleId,
  fetchArticles,
  fetchArticleById,
  insertComment,
};
