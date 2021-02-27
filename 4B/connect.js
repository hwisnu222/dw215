const mysql = require("mysql2");

const database = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dumbways5",
};

const connection = mysql.createConnection(database);
module.exports = connection;
