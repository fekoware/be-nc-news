# Northcoders News API
This is a portfolio project created as part of a Digital Skills Bootcamp in Software Engineering provided by Northcoders.

# About
The NC News API is a RESTful API designed to provide news articles, topics, and user interactions. It includes functionality for retrieving, adding, updating, and deleting articles, comments, and users.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
Node.js v21.7.3 or later.
Postgres v14 or later.

# Installation

Clone the repository:
bash
Copy code
git clone https://github.com/fekoware/be-nc-news.git
cd be-nc-news

Install dependencies:
This API relies on dotenv, express and pg. There are several extra developer dependencies for testing.

# Running the Application

Creating .env files for local hosting

This API uses private .env files that contain the environment variables for the databases. 

To connect to the databases locally you will need to create two .env files called .env.test and .env.development, each for the test and development databases. 

In the testing .env file, declare PGDATABASE=nc_news_test
In the development .env file, declare PGDATABASE=nc_news

Seed the development database:
bash
Copy code
npm run seed
Start the server:
bash
Copy code
npm start

Running the Tests
To run the tests, use:
bash
Copy code
npm test
Endpoints
For detailed information about the available endpoints, refer to the endpoints.json file in the repository.


# Acknoledgements

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
