const db = require("../db/connection")

const fetchTopics = () => {
    console.log("model entered")

    return db.query('SELECT * from topics').then(({rows}) => {
        console.log(rows);
        return rows
    })
}

module.exports = { fetchTopics }