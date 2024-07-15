const express = require("express");
const db = require("./db/connection");
const { getTopics } = require("./controllers/topics.controller")
const endpoints = require("./endpoints.json")
// const { getEndpoints } = require("./controllers/api.controller")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics)
app.get("/api", (req, res, next) => {
    console.log({endpoints})
    res.status(200).send({endpoints: endpoints})
})

module.exports = app;