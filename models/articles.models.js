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

const fetchArticles = (order = 'desc') => {


    const allowedOrders = [
        "asc",
        "desc"
    ]

  
    if (!allowedOrders.includes(order)) {
        return Promise.reject({status: 400, message: 'Bad Request'})
    }
    
    return db.query(`SELECT * from articles 
        ORDER BY created_at ${order}`).then((result) => {
        return result.rows
    })
}

module.exports = { fetchArticles, fetchArticleById };
