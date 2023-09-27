import Sequelize from "sequelize";
import mongoose from "mongoose";

// PostgreSQL connection URL
const dbURL =
  "postgres://nrhxvwna:EHQ3MzTRa4Zc0-ofLEjkXeXVYSPikLCL@motty.db.elephantsql.com/nrhxvwna";

// Create a Sequelize instance using the connection URL
const sequelize = new Sequelize(dbURL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true, // Enable SSL for secure connections
  },
});

async function connect() {
  const uri =
    "mongodb+srv://bookuser:iLZi6crJAHgUMBSc@cluster0.rujzz9l.mongodb.net/?retryWrites=true&w=majority";
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Export Sequelize and MongoDB client separately
export { connect };
export { sequelize };
