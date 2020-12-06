const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

module.exports = connection;