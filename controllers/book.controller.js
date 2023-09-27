import BookService from "../services/book.service.js";

const requiredBookFields = ["name", "value", "authorId"];
const requiredBookInfoFields = ["bookId", "description", "pages", "editor"];
const requiredBookReview = ["bookId", "review"];
const requiredBookReviewFields = ["name", "rating", "review"];

async function createBook(req, res, next) {
  try {
    let book = req.body;
    for (const field of requiredBookFields) {
      if (!book[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await BookService.createBook(book));
    logger.info(`POST /book - ${JSON.stringify(book)}`);
  } catch (err) {
    next(err);
  }
}

async function createBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    for (const field of requiredBookInfoFields) {
      if (!bookInfo[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await BookService.createBookInfo(bookInfo));
    logger.info(`POST /book/info - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function createBookReview(req, res, next) {
  try {
    let bookId = req.params.id;
    let bookReview = req.body;
    const reviewPushed = await BookService.createBookReview(bookId, bookReview);
    if (reviewPushed) {
      res
        .status(200)
        .send(
          `The following review has been added to the bookId: ${bookId} \n ${bookReview}`
        );
    } else {
      throw new Error("The provided bookId not found");
    }

    logger.info(
      `POST /book/:id/review - bookId: ${bookId} - ${JSON.stringify(
        bookReview
      )}`
    );
  } catch (err) {
    next(err);
  }
}

async function getBooks(req, res, next) {
  try {
    let books;
    const authorId = req.query.authorId;
    if (authorId) {
      books = await BookService.getAuthorBooks(authorId);
      if (books <= 0) throw new Error("The requested author don't have books");
    } else {
      books = await BookService.getBooks();
    }
    res.send(books);
    logger.info(`GET /book - ${JSON.stringify(books)}`);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    const bookId = req.params.id;
    const book = await BookService.getBook(bookId);
    if (book) {
      res.send(book);
    } else {
      throw new Error("Book not found");
    }
    logger.info(`GET /book - ${JSON.stringify(book)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    let book = req.body;
    for (const field of book) {
      if (book[field] !== "value") {
        throw new Error("Required field is missing: " + field);
      } else if (book[field] === "name" || book[field] === "authorId") {
        throw new Error(`The field ${book[field]} should not be updated`);
      } else {
        throw new Error(`Invalid Input`);
      }
    }
    const updatedBook = await BookService.updateBook(book);
    if (updatedBook) {
      res.send(updatedBook);
    } else {
      throw new Error("Book not found. BookId: " + book.bookId);
    }
    logger.info(`PUT /book - ${JSON.stringify(book)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    for (const field of requiredBookInfoFields) {
      if (!bookInfo[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await BookService.updateBookInfo(bookInfo));
    logger.info(`PUT /book/info - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    let bookId = req.params.id;
    const deletedBook = await BookService.deleteBook(bookId);
    if (deletedBook === true) {
      res.send("Book deleted successfully");
    } else if (deletedBook === false) {
      throw new Error("Book not found");
    } else if (deletedBook === "hasSales") {
      throw new Error("Book has associated sales. Deletion is not allowed.");
    }
    logger.info(`DELETE /book/:id - ${JSON.stringify(bookId)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteBookInfo(req, res, next) {
  try {
    const bookId = req.params.id;
    res.send(await BookService.deleteBookInfo(bookId));
    logger.info(`DELETE /book/info/:id - ${JSON.stringify(bookId)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteBookReview(req, res, next) {
  try {
    const bookId = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    res.send(await BookService.deleteBookReview(bookId, reviewIndex));
    logger.info(
      `DELETE /book/:bookId/review/:reviewIndex - bookId: ${bookId} - ${JSON.stringify(
        reviewIndex
      )}`
    );
  } catch (err) {
    next(err);
  }
}

export default {
  createBook,
  createBookInfo,
  createBookReview,
  getBooks,
  getBook,
  updateBook,
  updateBookInfo,
  deleteBook,
  deleteBookInfo,
  deleteBookReview,
};
