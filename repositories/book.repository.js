import Books from "../models/book.model.js";
import BookInfoRepository from "./bookInfo.repository.js";

async function createBook(book) {
  try {
    return Books.create(book);
  } catch (err) {
    throw err;
  }
}

async function getBook(bookId) {
  try {
    const book = await Books.findOne({ where: { bookId: bookId } });
    const bookInfoArray = await BookInfoRepository.getBookInfo(bookId);
    return { book, bookInfo: bookInfoArray };
  } catch (err) {
    throw err;
  }
}

async function getBooks() {
  try {
    return Books.findAll();
  } catch (err) {
    throw err;
  }
}

async function getAuthorBooks(authorId) {
  try {
    return await Books.findAll({
      where: {
        authorId: authorId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateBook(book) {
  try {
    const [count, updatedBooks] = await Books.update(
      {
        name: book.name,
        value: book.value,
        stock: book.stock,
        authorId: book.authorId,
      },
      {
        where: { bookId: book.bookId },
        returning: true, // This returns the updated book(s)
      }
    );

    if (count === 0) {
      return { error: "Book not found" };
    }

    return updatedBooks[0].toJSON(); // Assuming you want to return the first updated book
  } catch (err) {
    throw err;
  }
}
async function deleteBook(bookId) {
  try {
    const deletedBook = await Books.destroy({
      where: { bookId: bookId },
    });
    return true;
  } catch (err) {
    throw err;
  }
}
export default {
  createBook,
  getBook,
  getBooks,
  getAuthorBooks,
  updateBook,
  deleteBook,
};
