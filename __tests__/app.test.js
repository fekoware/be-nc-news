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

describe("GET", () => {
  // 220: responds with an array of topic objects
  // 404: non existent endpoint
  describe("/api/topics", () => {
    it("200: Responds with an array of objects", () => {
      //arrange
      return request(app).get("/api/topics").expect(200);
    });
    it("200: Responds with an array of topic objects, of whcih should have slug and description as properties", () => {
      //arrange
      return (
        request(app)
          .get("/api/topics")
          //assert
          .expect(200)
          .then(({ body }) => {

            // add in tests to specifically check for the keys of slug and description
            expect(body).toEqual({
              topics: [
                {
                  slug: "mitch",
                  description: "The man, the Mitch, the legend",
                },
                { slug: "cats", description: "Not dogs" },
                { slug: "paper", description: "what books are made of" },
              ],
            });
          })
      );
    });
  });

  describe.only("/api", () => {
    //200: should respond with an object with all endpoints
    //
    it("200: should respond with an object", () => {
      //arrange
      return request(app)
        .get("/api").expect(200)
        .then(({body}) => {
          expect( body.endpoints ).toEqual(endpoints);
        });
    });

    it("200: should respond with an object with key of slug", () => {
        //arrange
        return request(app)
          .get("/api").expect(200)
          .then(({body}) => {
            expect( body.endpoints ).toEqual(endpoints);
          });
      });

      //was thinking to add in test for keys on each endpooint object, however each doesnt have the same amount of keys

      //new test

  });
});
