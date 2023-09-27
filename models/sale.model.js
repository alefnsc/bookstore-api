import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import Customer from "./customer.model.js"; // Import the Customer model
import Book from "./book.model.js"; // Import the Book model

class Sale extends Model {}

Sale.init(
  {
    saleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customerId",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "bookId",
      },
    },
  },
  {
    sequelize,
    modelName: "Sale",
  }
);

export default Sale;
