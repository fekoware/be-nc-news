const db = require("../db/connection")
const {fetchEndpoints} = require('../models/api.models')

const getEndpoints = (req, res, next) => {
    console.log("connected to controller")
    res.status(200).send({endpoints: endpoints})
}
module.exports = {getEndpoints}