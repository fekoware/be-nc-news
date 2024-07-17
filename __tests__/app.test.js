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
    it("200: responds with array of article objects each with a property of number of comments per article", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((result) => {
          expect(result.body.articles.length).toBeGreaterThan(0);
          result.body.articles.forEach((article) => {
            expect(article).toEqual({
              article_id: expect.any(Number),
              title: expect.any(String),
              author: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        });
    });

    it("200: responds with array of articles in descending order", () => {
      return request(app)
        .get("/api/articles?order=desc")
        .expect(200)
        .then((result) => {
          expect(result.body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });

    it("200: responds with array of articles with body property removed", () => {
      return request(app)
        .get("/api/articles?order=desc")
        .expect(200)
        .then((result) => {
          expect(result.body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });

    //error handling

    it("400: invalid sort by query", () => {
      return request(app)
        .get("/api/articles?order=abcd")
        .expect(400)
        .then((result) => {
          expect(result.body.message).toBe("Bad Request");
        });
    });
  });

  //task 6
  describe("api/articles/:article_id/comments", () => {
    //error handling

    //400:

    it("200: should respond with array of comments for given article_id, with each article comment to have 6 matching properties", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then((result) => {
          result.body.comment.forEach((comment) => {
            expect(comment.article_id).toBe(3);
            expect(Object.keys(comment).length).toBe(6);
          });
        });
    });

    it("should respond with an array of comments for given article in descending order", () => {
      return request(app)
        .get("/api/articles/3/comments?order=desc")
        .expect(200)
        .then((result) => {
          expect(result.body.comment).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });

    //error handling

    it("400: should respond with error when id is valid but out of range", () => {
      return request(app)
        .get("/api/articles/999999/comments")
        .expect(400)
        .then((result) => {
          expect(result.body.message).toBe("Bad Request");
        });
    });

    it("400: invalid id (eg data type)", () => {
      return request(app)
        .get("/api/articles/lemons/comments")
        .expect(400)
        .then((result) => {
          expect(result.body.message).toBe("Bad Request");
        });
    });

    it("400: invalid order parameter given", () => {
      return request(app)
        .get("/api/articles/lemons/comments?order=xyz")
        .expect(400)
        .then((results) => {
          expect(results.body.message).toBe("Bad Request");
        });
    });
  });
});

describe("POST", () => {
  describe("/api/articles/:article_id/comments", () => {
    it("201: inserts new comment into db and returns comment to client", () => {
      const newComment = {
        username: "icellusedkars",
        body: "testing api posting",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
          expect(response.body.body).toEqual(newComment.body);
        });
    });
    //error handling
    //400: valid article_id out of range
    it("404: valid article_id out of range", () => {
      const newComment = {
        username: "icellusedkars",
        body: "testing api posting",
      };
      return request(app)
        .post("/api/articles/999999/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request");
        });
    });

    //400: invalid username inserted
    it("404: invalid username inserted", () => {
      const newComment = {
        username: "hellobellomello",
        body: "testing api posting",
      };
      return request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request");
        });
    });
    //400 invalid article id data type
    it("404: invalid username inserted", () => {
      const newComment = {
        username: "hellobellomello",
        body: "testing api posting",
      };
      return request(app)
        .post("/api/articles/lemons/comments")
        .send(newComment)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request");
        });
    });
  });
});

describe("PATCH", () => {
  describe("/api/articles/:article_id", () => {
    // invalid article data type
    // valid srticle id out of range
    it("200: should update valid article vote property", () => {
      const articleUpdates = {
        vote : 3
      }
      return request(app)
        .patch("/api/articles/2")
        .send(articleUpdates)
        .expect(200)
        .then((response) => {
          expect(response.body.votes).toBe(3)
        });
    });

    it("invalid article data type", () => {
      const articleUpdates = {
        vote : 3
      }
      return request(app)
        .patch("/api/articles/bmwx5")
        .send(articleUpdates)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request")
        });
    });

    it("400: valid article id out of range", () => {
      const articleUpdates = {
        vote : 3
      }
      return request(app)
        .patch("/api/articles/9999999")
        .send(articleUpdates)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request")
        });
    });

    it.only("400: invalid data type being inserted", () => {
      const articleUpdates = {
        vote : 'vroom'
      }
      return request(app)
        .patch("/api/articles/2")
        .send(articleUpdates)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Bad Request")
        });
    });


  });
});
