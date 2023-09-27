import express from "express";
import cors from "cors";
import winston from "winston";
import booksRouter from "../routes/book.route.js";
import customersRouter from "../routes/customer.route.js";
import authorsRouter from "../routes/author.route.js";
import salesRouter from "../routes/sale.route.js";
import { basicAuth } from "../auth/basicAuth.js";
import { sequelize } from "../config/db.js";

const port = 3000;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/bookstore-api.log",
    }),
  ],
  format: combine(label({ label: "book-api" }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(basicAuth);

app.use("/book", booksRouter);
app.use("/customer", customersRouter);
app.use("/author", authorsRouter);
app.use("/sale", salesRouter);

app.get("/", async (req, res) => {
  res.status(200).send(`API Started - Listening on port ${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => console.log(`API Started - Listening on port ${port}`));

export default app;
