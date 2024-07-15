const request = require("supertest");
const app = require("../app");
const express = require("express");
const db = require("../db/connection");
const endpoints = require("../endpoints.json");

const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

//starting connection and seeding data file into database
beforeEach(() => seed(data));

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  // 220: responds with an array of topic objects
  // 404: non existent endpoint

  it("200: Responds with an array of objects", () => {
    //arrange
    return request(app).get("/api/topics").expect(200)
  });

  it("200: Responds with an array of topic objects, of whcih should have slug and description as properties", () => {
    //arrange

    return request(app).get("/api/topics").expect(200).then(({body}) => {
        expect(body).toEqual(  {topics: [
            { slug: 'mitch', description: 'The man, the Mitch, the legend' },
            { slug: 'cats', description: 'Not dogs' },
            { slug: 'paper', description: 'what books are made of' }
          ]})
    })
  });


});
