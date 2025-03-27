/* imports */
const mysql = require("mysql2/promise");
const sequelize = require("./config");

/* Establish a connection with the database */
const Connection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connection to ${config.db.database} has been established successfully.`);
  } catch (error) {
    console.error(`Error connecting to ${config.db.database}:`, error.message);
    throw error;
  }
};

/* export */
module.exports = Connection;
