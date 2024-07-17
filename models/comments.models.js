const db = require("../db/connection");

const deleteComment = (comment_id) => {
  
    console.log('inside model')

    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id]).then((result) => { 
        console.log(result)

       
    })
}

module.exports = { deleteComment }