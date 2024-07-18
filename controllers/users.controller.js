const { fetchUsers } = require("../models/users.models")

const getUsers = (req, res, next) => {
    console.log("inside controller")

    fetchUsers().then((users) => {
        console.log({users})
        res.status(200).send({users})

    })
}

module.exports = { getUsers }