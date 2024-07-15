const db = require("../db/connection")
const {fetchTopics} = require('../models/topics.models')

const getTopics = (req, res, next) => {
    console.log("app connected to controller");

    fetchTopics().then((topics) => {
        console.log("entering the model")
        console.log({topics})
        res.status(200).send({topics})
    })
}

module.exports = { getTopics }