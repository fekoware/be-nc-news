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
    it("200: responds with an article object with correct article_id and correct number of keys", () => {
      //arrange
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          expect(res.body.article.article_id).toBe(1);
          expect(Object.values(res.body.article).length).toBe(8);
        });

      //act

      //assert
    });

    it("404: responds with error with given valid id not registered", () => {
      //arrange
      return request(app)
        .get("/api/articles/999999999")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("404 - Bad Request");
        });
    });

    it("400: responds with error when given invalid id (eg invalid data type)", () => {
      return request(app)
        .get("/api/articles/bananas")
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request");
        });
    });

    
  });

  //task 5

  describe("/api/articles", () => {
 
    //200: responds with array of articles in descending order without body property

    //error handling


    //400: invalid sort by query

    //


    it("200: responds with array of article objects (correct amount) each with 8 properties", () => {
      return request(app).get("/api/articles").expect(200).then((result) => {

        expect(Object.keys(result.body.articles).length).toBe(13)
        result.body.articles.forEach((article) => {
          expect(Object.keys(article).length).toBe(7)
        })

        

      })
    })

    it("200: responds with array of articles in descending order", () => {
      return request(app).get("/api/articles?order=desc").expect(200).then((result) => {

        expect(result.body.articles).toBeSortedBy(  'created_at', {descending: true})
      })
    })

    it("200: responds with array of articles with body property removed", () => {
      return request(app).get("/api/articles?order=desc").expect(200).then((result) => {

        expect(result.body.articles).toBeSortedBy(  'created_at', {descending: true})
      })
    })

    //error handling

    it("400: invalid sort by query", () => {
      return request(app).get("/api/articles?order=abcd").expect(400).then((result) => {

        expect(result.body.message).toBe('Bad Request')
      })
    })

  })

  //task 6
  describe("api/articles/:article_id/comments", () => {

    
    //error handling

    //400:

    it("200: should respond with array of comments for given article_id, with each article comment to have 6 matching properties", () => {
      return request(app).get("/api/articles/3/comments").expect(200).then((result) => {
        console.log(result.body.comment, "in test")
        result.body.comment.forEach((comment) => {
          expect(comment.article_id).toBe(3);
          expect(Object.keys(comment).length).toBe(6)
          
        })
      })
    })

    it("should respond with an array of comments for given article in descending order", () => {
      return request(app).get("/api/articles/3/comments?order=desc").expect(200).then((result) => {
        expect(result.body.comment).toBeSortedBy('created_at', {descending: true})
      })
    })

    //error handling

    it("400: should respond with error when id is valid but out of range", () => {
      return request(app).get("/api/articles/999999/comments").expect(400).then((result) => {
        expect(result.body.message).toBe('Bad Request')
      })

    })

    it("400: invalid id (eg data type)", () => {
      return request(app).get("/api/articles/lemons/comments").expect(400).then((result) => {
        expect(result.body.message).toBe('Bad Request')
      })
    })

    it(("400: invalid order parameter given"), () => {
      return request(app).get("/api/articles/lemons/comments?order=xyz").expect(400).then((results) => {
        expect(results.body.message).toBe('Bad Request')
      })
    })


  })

});
