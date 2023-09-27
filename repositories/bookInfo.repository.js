import { connect } from "../config/db.js";
import BookInfoSchema from "../schemas/bookInfo.schema.js";

async function createBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    let BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    BookInfo = new BookInfo(bookInfo);
    return await BookInfo.save();
  } catch (err) {
    throw err;
  }
}

async function updateBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    let BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    return await BookInfo.findOneAndUpdate(
      { bookId: bookInfo.bookId },
      bookInfo,
      {
        new: true,
      }
    );
  } catch (err) {
    throw err;
  }
}

async function getBookInfo(bookId) {
  try {
    const mongoose = await connect();
    let BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    return await BookInfo.findOne({ bookId }).exec();
  } catch (err) {
    throw err;
  }
}

async function getBooksInfo() {
  try {
    const mongoose = await connect();
    let BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    return await BookInfo.find({}).exec();
  } catch (err) {
    throw err;
  }
}

async function createBookReview(bookId, bookReview) {
  try {
    const bookInfo = await getBookInfo(bookId);
    bookInfo.reviews.push(bookReview);
    return await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

async function deleteBookInfo(bookId) {
  try {
    const mongoose = await connect();
    let BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    return await BookInfo.deleteOne({ bookId }).exec();
  } catch (err) {
    throw err;
  }
}

async function deleteBookReview(bookId, index) {
  try {
    const bookInfo = await getBookInfo(bookId);
    bookInfo.reviews.splice(index, 1);
    return await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

export default {
  createBookInfo,
  createBookReview,
  updateBookInfo,
  getBookInfo,
  getBooksInfo,
  deleteBookInfo,
  deleteBookReview,
  getBooksInfo,
};
