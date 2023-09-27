import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import Author from "./author.model.js"; // Import the Author model

class Books extends Model {}

Books.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: "authorId",
      },
    },
  },
  {
    sequelize,
    modelName: "Books",
  }
);

export default Books;
