require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
});



//features to add: remove employee, list. add employee, firstname, last name, role, are they a manager? 