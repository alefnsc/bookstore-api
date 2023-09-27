import { sequelize } from "../config/db.js";
import Authors from "../models/author.model.js";

async function createAuthor(author) {
  try {
    return Authors.create(author);
  } catch (err) {
    throw err;
  }
}

async function getAuthor(authorId) {
  try {
    return Authors.findOne({ where: { authorId: authorId } });
  } catch (err) {
    throw err;
  }
}

async function getAuthors() {
  try {
    return Authors.findAll();
  } catch (err) {
    throw err;
  }
}

async function updateAuthor(author) {
  try {
    const updatedAuthor = await Authors.update(
      {
        name: author.name,
        email: author.email,
        phone: author.phone,
      },
      {
        where: { authorId: author.authorId },
        returning: true,
      }
    );

    return updatedAuthor[1];
  } catch (err) {
    throw err;
  }
}

async function deleteAuthor(authorId) {
  try {
    const deletedAuthor = await Authors.destroy({
      where: { authorId: authorId },
    });

    return true;
  } catch (err) {
    throw err;
  }
}
export default {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
};
