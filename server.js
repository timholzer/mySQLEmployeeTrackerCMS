require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./connection')



connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
});



//features to add: remove employee, list. add employee, firstname, last name, role, are they a manager? 
function runApp(){
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'What do you want to do?',
        choices: [
            "View Employees",
            "View Roles",
            "View Departments",
            "Add Employees",
            "Add Role",
            "Add Department",
            "Update Employee",
            //bonuses
            // "update employee manager",
            // "view by manager",
            // "Delete Employees",
            // "Delete Role",
            // "Delete Department",
            // "View department budget"


            "Exit"
          ]
        })
        .then(function(res) {
            console.log("You entered: " + res.menu);
            switch (res.menu) {
              case "View Employees":
                viewEmployees();
                break;
              case "View Roles":
                viewRoles();
                break;
              case "View Departments":
                viewDepartments();
                break;
              case "Add Employee":
                addEmployee();
                break;
              case "Add Role":
                addRole();
                break;
              case "Add Department":
                addDepartment();
                break;
              case "Update Employee":
                updateEmployee();
                break;
              case "Exit":
                connection.end();
                break;
            }
          });
      
        








}





runApp();