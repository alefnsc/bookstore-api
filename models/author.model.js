import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Authors extends Model {}

Authors.init(
  {
    authorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Authors",
  }
);

export default Authors;
