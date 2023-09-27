import express from "express";
import AuthorController from "../controllers/author.controller.js";
import { authorize } from "../auth/basicAuth.js";
const router = express.Router();

router.post("/", authorize("admin"), AuthorController.createAuthor);
router.get("/:id", authorize("admin"), AuthorController.getAuthor);
router.get("/", authorize("admin"), AuthorController.getAuthors);
router.put("/", authorize("admin"), AuthorController.updateAuthor);
router.delete("/:id", authorize("admin"), AuthorController.deleteAuthor);

export default router;
