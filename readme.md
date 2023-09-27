# Table of Contents

1. [Introduction](#1-introduction)
2. [Installation](#3-installation)
3. [Usage](#3-usage)
4. [Methods](#4-methods)
5. [Libraries Used](#5-libraries-used)
6. [Contact](#6-contact)

---

# 1. Introduction

Welcome to the documentation for the Bookstore API. This project aims to provide a RESTful API for managing a a bookstore, including Authors, Customers, Books and Sales. It also provide a way to create reviews under the books.

The purpose of this project was to sum up all of the knowledge obtained across the Node.Js bootcamp of fullstack post graduating of XP Education to prepare to the final integrator project.

It includes migrations of the database, providing schemas and models to facilitate sharing across developer's team. Also have a basic authentication and authorization handling. Uses a structered and ununstructered databases, leveraging MongoDB and PostgreSQL according to the need. It have some integrations's test through Jest and Supertest and it also provide a logging of all of operations performed

# 2. Installation

To install and set up the project locally, follow these steps:

1. Clone the project repository from GitHub:

```bash
git clone https://github.com/alefnsc/booktore-api.git
```

2. Navigate to the project directory:

```bash
cd bookstore-api
```

3. Install project dependencies using npm:

```bash
npm install
```

# 3. Usage

After installation, you can start the server by running:

```bash
npm start
```

This will start the Express server and make the API available at http://localhost:3000.

To perform tests you can run:

```bash
npm test
```

To try it on the watch mode, just run:

```bash
npm run watch
```

# 4. Methods

Checkout the description, how to use each method, the authorizaton needed, required fields, rules and optional parameters.

## Author Routes

### `GET /author`

- **Description:** Retrieves all authors.
- **Authorization:** Requires admin authorization.
- **Method:** GET

### `GET /author/:id`

- **Description:** Retrieves a specific author by their ID.
- **Authorization:** Requires admin authorization.
- **Method:** GET

### `POST /author`

- **Description:** Creates a new author.
- **Authorization:** Requires admin authorization.
- **Method:** POST
- **Required Fields:** name, email, phone.

### `PUT /author`

- **Description:** Updates author information.
- **Authorization:** Requires admin authorization.
- **Method:** PUT
- **Required Fields:** id, name, email, phone.

### `DELETE /author/:id`

- **Description:** Deletes an author by their ID.
- **Authorization:** Requires admin authorization.
- **Method:** DELETE
- **Rule:** If the author has associated books. Deletion is not allowed.

## Book Routes

### `GET /book`

- **Description:** Retrieves all books.
- **Authorization:** Requires admin or user authorization.
- **Method:** GET
- **Optional Rule:** You might use the query parameter "?authorId=" on the URL to retrieve all books of a specific author.

### `GET /book/:id`

- **Description:** Retrieves a specific book by its ID.
- **Authorization:** Requires admin or user authorization.
- **Method:** GET

### `POST /book`

- **Description:** Creates a new book.
- **Authorization:** Requires admin authorization.
- **Method:** POST

### `PUT /book`

- **Description:** Updates book information.
- **Authorization:** Requires admin authorization.
- **Method:** PUT
- **Required Fields:** value.
- **Rule:** You should not update the book's name and authorId fields

### `DELETE /book/:id`

- **Description:** Deletes a book by its ID.
- **Authorization:** Requires admin authorization.
- **Method:** DELETE
- **Rule:** If the book has associated sales. Deletion is not allowed.

### `POST /book/info`

- **Description:** Creates book's information.
- **Authorization:** Requires admin authorization.
- **Method:** POST
- **Required Fields:** bookId, description, pages, editor.

### `PUT /book/info`

- **Description:** Updates book information.
- **Authorization:** Requires admin authorization.
- **Method:** PUT
- **Required Fields:** bookId, description, pages, editor.

### `DELETE /book/info/:id`

- **Description:** Deletes book information by bookId.
- **Authorization:** Requires admin authorization.
- **Method:** DELETE

### `POST /book/:id/review`

- **Description:** Creates a book review.
- **Authorization:** Requires admin or user authorization.
- **Method:** POST

### `DELETE /book/:id/review/:index`

- **Description:** Deletes a book (by bookId) review by its index (starting on 0).
- **Authorization:** Requires admin authorization.
- **Method:** DELETE

## Customer Routes

### `GET /customer`

- **Description:** Retrieves all customers.
- **Authorization:** Requires admin authorization.
- **Method:** GET

### `GET /customer/:id`

- **Description:** Retrieves a specific customer by their ID.
- **Authorization:** Requires admin authorization.
- **Method:** GET

### `POST /customer`

- **Description:** Creates a new customer.
- **Authorization:** Requires admin authorization.
- **Method:** POST
- **Required Fields:** name, email, password, phone, address

### `PUT /customer`

- **Description:** Updates customer information.
- **Authorization:** Requires admin authorization.
- **Method:** PUT
- **Required Fields:** customerId, name, email, password, phone, address

### `DELETE /customer/:id`

- **Description:** Deletes a customer by their ID.
- **Authorization:** Requires admin authorization.
- **Method:** DELETE
- **Rule:** If customer has associated sales. Deletion is not allowed.

## Sale Routes

### `GET /sale`

- **Description:** Retrieves all sales.
- **Authorization:** Requires admin or user authorization.
- **Method:** GET
- **Optional Rule 1:** You might use the query parameter "?bookId=" on the URL to retrieve all sales of a specific book.
- **Optional Rule 2:** You might use the query parameter "?authorId=" on the URL to retrieve all sales of a specific author.
- **Optional Rule 3:** You might use the query parameter "?customerId=" on the URL to retrieve all sales of a specific customer.

### `GET /sale/:id`

- **Description:** Retrieves a specific sale by its ID.
- **Authorization:** Requires admin authorization.
- **Method:** GET

### `POST /sale`

- **Description:** Creates a new sale.
- **Authorization:** Requires admin or user authorization.
- **Method:** POST

### `PUT /sale`

- **Description:** Updates sale information.
- **Authorization:** Requires admin authorization.
- **Method:** PUT

Please make sure to include the required authorization headers when making requests to these routes.

## Admin Credentials

It could be updated on [basicAuth](./auth/basicAuth.js)

- **Username:** admin
- **Password:** desafio-igti-nodejs

# 5. Libraries Used

- **basic-auth:** a library which streamline authentication headers access to facilitate credentials retrieve.

- **jest:** Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

- **supertest:** Supertest is a Node. js library that allows developers and testers to test the APIs. It enables developers and testers to write automated tests for routes and endpoints.

- **cors:** A package that enables Cross-Origin Resource Sharing (CORS) in Express applications, allowing controlled access to resources from different origins.

- **express:** A popular web application framework for Node.js used to create APIs and web servers. It simplifies routing, middleware, and handling HTTP requests.

- **mongoose:** A MongoDB driver for Node.js, providing methods for interacting with MongoDB databases.

- **nodemon:** A tool that monitors changes in your source code and automatically restarts the Node.js application when changes are detected. Great for development.

- **pg:** A PostgreSQL client for Node.js that enables you to interact with PostgreSQL databases.

- **sequelize:** A promise-based Node.js ORM (Object-Relational Mapping) for relational databases like PostgreSQL, MySQL, SQLite, etc.

- **winston:** A popular logging library for Node.js that offers flexible and configurable logging options.

# 6. Contact

- **Maintainer:** Alexandre Fonseca
- **Email:** alexandrefonsecach@gmail.com
