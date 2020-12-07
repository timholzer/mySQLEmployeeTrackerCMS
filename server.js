require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
//const connection = require('./connection')

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
            "Add Employee",
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
          function viewEmployees() {
            const query = "SELECT * FROM employee";
            connection.query(query, function(err, res) {
              if (err) throw err;
              console.table(res);
              //consoleTable(res);
              runApp();
            });
          }
          function viewRoles() {
            const query = "SELECT * FROM role";
            connection.query(query, function(err, res) {
              if (err) throw err;
              console.table(res);
              //consoleTable(res);
              runApp();
            });
          }
          function viewDepartments() {
            const query = "SELECT * FROM department";
            connection.query(query, function(err, res) {
              if (err) throw err;
              console.table(res);
              //consoleTable(res);
              runApp();
            });
          }
          function addEmployee() {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter the employee's first name.",
                  name: "firstName"
                },
                {
                  type: "input",
                  message: "Enter the employee's last name.",
                  name: "lastName"
                },
                {
                  type: "input",
                  message: "What is the employee's role ID.",
                  name: "roleID"
                },
                {
                  type: "input",
                  message: "What is the employee's manager ID.",
                  name: "managerID"
                }
              ])
              .then(function(res) {
                const firstName = res.firstName;
                const lastName = res.lastName;
                const roleID = res.roleID;
                const managerID = res.managerID;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  runApp();
                });
              });
          }
          function addRole() {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter the job title you want to add.",
                  name: "jobtitle"
                },
                {
                  type: "input",
                  message: "Enter the job's salary.",
                  name: "salary"
                },
                {
                  type: "input",
                  message: "What is the job's department ID.",
                  name: "departmentID"
                }
              ])
              .then(function(res) {
                const jobtitle = res.jobtitle;
                const salary = res.salary;
                const departmentID = res.departmentID;
                const query = `INSERT INTO role (title, salary, department_id) VALUE("${jobtitle}", "${salary}", "${departmentID}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  runApp();
                });
              });
          }
          function addDepartment() {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter the department name you want to add.",
                  name: "department"
                }
              ])
              .then(function(res) {
                const department = res.department;
                const query = `INSERT INTO department (department_name) VALUE(${department}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  runApp();
                });
              });
          }

          //this is incomplete, using add employee as a starting point
          function updateEmployee() {
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter the employee's first name.",
                  name: "firstName"
                },
                {
                  type: "input",
                  message: "Enter the employee's last name.",
                  name: "lastName"
                },
                {
                  type: "input",
                  message: "What is the employee's role ID.",
                  name: "roleID"
                },
                {
                  type: "input",
                  message: "What is the employee's manager ID.",
                  name: "managerID"
                }
              ])
              .then(function(res) {
                const firstName = res.firstName;
                const lastName = res.lastName;
                const roleID = res.roleID;
                const managerID = res.managerID;
                const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
                connection.query(query, function(err, res) {
                  if (err) throw err;
                  console.table(res);
                  runApp();
                });
              });
          }

      
        








}





runApp();