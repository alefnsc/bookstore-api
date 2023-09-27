import AuthorService from "../services/author.service.js";

const requiredFields = ["name", "email", "phone"];

async function createAuthor(req, res, next) {
  try {
    let author = req.body;
    for (const field of requiredFields) {
      if (!author[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await AuthorService.createAuthor(author));
    logger.info(`POST /author - ${JSON.stringify(author)}`);
  } catch (err) {
    next(err);
  }
}

async function getAuthors(req, res, next) {
  try {
    const authors = await AuthorService.getAuthors();
    res.send(authors);
    logger.info(`GET /author - ${JSON.stringify(authors)}`);
  } catch (err) {
    next(err);
  }
}

async function getAuthor(req, res, next) {
  try {
    const authorId = req.params.id;
    const author = await AuthorService.getAuthor(authorId);
    res.send(author);
    logger.info(`GET /author - ${JSON.stringify(author)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    let author = req.body;
    for (const field of requiredFields) {
      if (!author[field]) {
        throw new Error("Required field is missing: " + field);
      }
    }
    res.send(await AuthorService.updateAuthor(author));
    logger.info(`POST /author - ${JSON.stringify(author)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await AuthorService.deleteAuthor(authorId);
    if (deletedAuthor === true) {
      res.send("Author sucessefull deleted");
    } else if (deletedAuthor === false) {
      throw new Error("Author not found.");
    } else if (deletedAuthor === "hasBooks") {
      throw new Error("Author has associated books. Deletion is not allowed.");
    }
    logger.info(`DELETE /author/:id - ${JSON.stringify(authorId)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
