import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    review: String,
  },
  { collection: "bookInfo" }
);

export default reviewSchema;
