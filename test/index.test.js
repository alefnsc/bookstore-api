import supertest from "supertest";
import app from "../src/index.js";
import { sequelize } from "../config/db.js";
import Authors from "../models/author.model.js";
import Books from "../models/book.model.js";
import Customers from "../models/customer.model.js";
import Sales from "../models/sale.model.js";

const request = supertest(app);

describe("Library Integration Test", () => {
  afterAll(async () => {
    await Authors.destroy({ where: {} });
    await Books.destroy({ where: {} });
    await Customers.destroy({ where: {} });
    await Sales.destroy({ where: {} });
  });
  const admin = {
    username: "admin",
    password: "desafio-igti-nodejs",
  };

  const author = {
    name: "Fulano TESTE",
    email: "fulano@livros.com",
    phone: "1198181-8181",
  };

  const book = {
    name: "Livro do Ciclano",
    value: "100.5",
    stock: 3,
  };

  const customer = {
    name: "Clientola",
    email: "clientola@pa.com",
    password: "123456",
    phone: "11930054865",
    address: "rua do clientola, 123",
  };

  const saleModel = {
    value: 50.0,
    date: "2023-09-27",
    customerId: null,
    bookId: null,
  };

  let createdCustomerId;
  let createdAuthorId;
  let createdBookId;

  // The tests should use the basic authentication header with data from admin constant
  // Always that an endpoint which creates a record is called, the test should call the endpoint which checks the created record to verify if it was created successfully

  test("Create an author with author's test data return 200", async () => {
    const response = await request
      .post("/author")
      .set(
        "Authorization",
        `Basic ${Buffer.from(`${admin.username}:${admin.password}`).toString(
          "base64"
        )}`
      )
      .send(author);

    expect(response.status).toBe(200);

    createdAuthorId = response.body.authorId; // Save the created author ID
  });

  test("Create a book with data from previously created author using book's test data return 200", async () => {
    // Create the book using the created author's ID
    const bookWithAuthorData = {
      ...book,
      authorId: createdAuthorId,
    };
    const bookResponse = await request
      .post("/book")
      .set(
        "Authorization",
        `Basic ${Buffer.from(`${admin.username}:${admin.password}`).toString(
          "base64"
        )}`
      )
      .send(bookWithAuthorData);

    expect(bookResponse.status).toBe(200);
    createdBookId = bookResponse.body.bookId; // Save the created book ID
  });

  test("Create a customer with customer's test data return 200", async () => {
    const response = await request
      .post("/customer")
      .set(
        "Authorization",
        `Basic ${Buffer.from(`${admin.username}:${admin.password}`).toString(
          "base64"
        )}`
      )
      .send(customer);

    expect(response.status).toBe(200);
    createdCustomerId = response.body.customerId; // Save the created customer ID
  });

  // Using the created Customer, it should do the tests below:

  test("Get the created book by its id return 200", async () => {
    const response = await request
      .get(`/book/${createdBookId}`)
      .set(
        "Authorization",
        `Basic ${Buffer.from(`${admin.username}:${admin.password}`).toString(
          "base64"
        )}`
      );

    expect(response.status).toBe(200);
  });

  test("Create a sale based on saleModel fields with created book by its id return 200", async () => {
    // Use created customer and book IDs for creation of the sale based on saleModel
    saleModel.customerId = createdCustomerId;
    saleModel.bookId = createdBookId;

    const response = await request
      .post("/sale")
      .set(
        "Authorization",
        `Basic ${Buffer.from(`${admin.username}:${admin.password}`).toString(
          "base64"
        )}`
      )
      .send(saleModel);

    expect(response.status).toBe(200);
  });
});
