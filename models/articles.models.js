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

module.exports = { fetchArticleById };
