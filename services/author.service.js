import AuthorRepository from "../repositories/author.repository.js";
import Books from "../models/book.model.js";

async function createAuthor(author) {
  return AuthorRepository.createAuthor(author);
}

async function getAuthors() {
  return await AuthorRepository.getAuthors();
}

async function getAuthor(authorId) {
  return await AuthorRepository.getAuthor(authorId);
}

async function updateAuthor(author) {
  const existantAuthor = await AuthorRepository.getAuthor(author.authorId);
  if (existantAuthor) {
    return await AuthorRepository.updateAuthor(author);
  } else {
    return false;
  }
}

async function deleteAuthor(authorId) {
  const bookCount = await Books.count({
    where: { authorId: authorId },
  });

  if (bookCount > 0) {
    return "hasBooks";
  }

  return await AuthorRepository.deleteAuthor(authorId);
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
