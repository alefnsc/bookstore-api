import mongoose from "mongoose";
import ReviewSchema from "./review.schema.js";

const bookInfoSchema = new mongoose.Schema(
  {
    bookId: Number,
    description: String,
    pages: String,
    editor: String,
    reviews: [ReviewSchema],
  },
  { collection: "bookInfo" }
);

export default bookInfoSchema;
