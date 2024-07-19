# View Project Online
[Click here.
](https://nc-news-bxej.onrender.com/api)

# About
The NC News is a news website built with Javascript. It is designed to provide news articles, topics, and user interactions. It includes functionality for retrieving, adding, updating, and deleting articles, comments, and users.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
Node.js v21.7.3 or later.
Postgres v14 or later.

# Installation

Clone the repository: git clone https://github.com/fekoware/be-nc-news.git

Install dependencies:
This API relies on dotenv, express and pg. There are several extra developer dependencies for testing.

# Running the Application

This API uses private .env files that contain the environment variables for the databases. 

To connect to the databases locally you will need to create two .env files called .env.test and .env.development, each for the test and development databases. 

In the testing .env file, declare PGDATABASE=nc_news_test
In the development .env file, declare PGDATABASE=nc_news

Setup the local database: npm run setup-dbs

Seed the development database: npm run seed

Start the server: npm start

Running the Tests
To run the tests, use: npm test

Endpoints
For detailed information about the available endpoints, refer to the endpoints.json file in the repository.

# Acknoledgements

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
