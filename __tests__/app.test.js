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

  describe("/api", () => {
    //200: should respond with an object with all endpoints
    //
    it("200: should respond with an object", () => {
      //arrange
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(endpoints);
        });
    });


    //was thinking to add in test for keys on each endpooint object, however each doesnt have the same amount of keys

    //new test
  });

  //tesk 4

  describe("/api/articles/:article_id", () => {
    //400: responds with error with given valid id not registered
    //400: responded with error when given invalid data date for ID
    it("200: responds with an article object with correct article_id and correct number of keys", () => {
      //arrange
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(res.body.article.article_id).toBe(1)
          expect(Object.values(res.body.article).length).toBe(8)
        }
          // console.log(body).expect(body.article.length).toBe(8)
        );

      //act

      //assert
    });


    it.only("404: responds with error with given valid id not registered", () => {

       //arrange
       return request(app)
       .get("/api/articles/999999999")
       .expect(404)
       .then((res) => {
        console.log(res.body.message, "hello")
         expect(res.body.message).toBe('404 - Bad Request')
       }
         // console.log(body).expect(body.article.length).toBe(8)
       );

     })
    // it("", () => {

    // })
    // it("", () => {

    // })
  });
});
