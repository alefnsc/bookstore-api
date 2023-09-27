import BookRepository from "../repositories/book.repository.js";
import BookInfoRepository from "../repositories/bookInfo.repository.js";
import Sales from "../models/sale.model.js";

async function createBook(book) {
  return await BookRepository.createBook(book);
}

async function createBookInfo(bookInfo) {
  return await BookInfoRepository.createBookInfo(bookInfo);
}

async function createBookReview(bookId, bookReview) {
  return await BookInfoRepository.createBookReview(bookId, bookReview);
}

async function getBooks() {
  return await BookRepository.getBooks();
}

async function getAuthorBooks(authorId) {
  return await BookRepository.getAuthorBooks(authorId);
}

async function getBook(bookId) {
  const book = await BookRepository.getBook(bookId);
  return book.book ? book : false;
}

async function updateBook(book) {
  const existantBook = await BookRepository.getBook(book.bookId);
  if (existantBook) {
    return await BookRepository.updateBook(book);
  } else {
    return false;
  }
}

async function updateBookInfo(bookInfo) {
  return await BookInfoRepository.updateBookInfo(bookInfo);
}

async function deleteBook(bookId) {
  const existantBook = await BookRepository.getBook(bookId);
  if (existantBook.book) {
    const saleCount = await Sales.count({
      where: { bookId: bookId },
    });
    if (saleCount > 0) {
      return "hasSales";
    } else {
      return await BookRepository.deleteBook(bookId);
    }
  } else {
    return false;
  }
}

async function deleteBookInfo(bookId) {
  return await BookInfoRepository.deleteBookInfo(bookId);
}

async function deleteBookReview(bookId, reviewIndex) {
  return await BookInfoRepository.deleteBookReview(bookId, reviewIndex);
}

export default {
  createBook,
  createBookInfo,
  createBookReview,
  getBooks,
  getAuthorBooks,
  getBook,
  updateBook,
  updateBookInfo,
  deleteBook,
  deleteBookInfo,
  deleteBookReview,
};
