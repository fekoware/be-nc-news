const { deleteComment } = require("../models/comments.models")


const removeComment = (req, res, next) => {
    console.log("inside controller")
    const comment_id = req.params.comment_id

    deleteComment(comment_id).then(() => {
        console.log("comment deleted")
        res.status(204).send()
    }).catch((err) => {
        next(err)
    })
}
module.exports = { removeComment }