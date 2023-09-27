import express from "express";
import BookController from "../controllers/book.controller.js";
import { authorize } from "../auth/basicAuth.js";

const router = express.Router();

router.post("/", authorize("admin"), BookController.createBook);
router.post("/info", authorize("admin"), BookController.createBookInfo);
router.post(
  "/:id/review",
  authorize("admin", "user"),
  BookController.createBookReview
);
router.get("/", authorize("admin", "user"), BookController.getBooks);
router.get("/:id", authorize("admin", "user"), BookController.getBook);
router.put("/", authorize("admin"), BookController.updateBook);
router.put("/info", authorize("admin"), BookController.updateBookInfo);
router.delete("/:id", authorize("admin"), BookController.deleteBook);
router.delete("/info/:id", authorize("admin"), BookController.deleteBookInfo);
router.delete(
  "/:id/review/:index",
  authorize("admin"),
  BookController.deleteBookReview
);

export default router;
