require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//const connection = require('./connection')

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function runApp() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What do you want to do?\n",
      choices: [
        "View Employees",
        "View Roles",
        "View Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee's Role",
        //bonuses
        // "update employee manager",
        // "view by manager",
        // "Delete Employees",
        // "Delete Role",
        // "Delete Department",
        // "View department budget"

        "Exit",
      ],
    })
    .then(function (res) {
      console.log("You entered: " + res.menu);
      switch (res.menu) {
        case "View Employees":
          viewEmployees();
          runApp();
          break;
        case "View Roles":
          viewRoles();
          runApp();
          break;
        case "View Departments":
          viewDepartments();
          runApp();
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
        case "Update Employee's Role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
  function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n Employee List\n")
      console.table(res);
      
    });
  }
  function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n List of Roles\n")
      console.table(res);
      
    });
  }
  function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n List of Departments\n")
      console.table(res);
      
    });
  }
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name.\n",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter the employee's last name.\n",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the employee's role ID.\n",
          name: "roleID",
        },
        {
          type: "input",
          message: "What is the employee's manager ID.\n",
          name: "managerID",
        },
      ])
      .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const managerID = res.managerID;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
        connection.query(query, function (err, res) {
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
          message: "Enter the job title you want to add.\n",
          name: "jobtitle",
        },
        {
          type: "input",
          message: "Enter the job's salary.\n",
          name: "salary",
        },
        {
          type: "input",
          message: "What is the job's department ID.\n",
          name: "departmentID",
        },
      ])
      .then(function (res) {
        const jobtitle = res.jobtitle;
        const salary = res.salary;
        const departmentID = res.departmentID;
        const query = `INSERT INTO role (title, salary, department_id) VALUE("${jobtitle}", "${salary}", "${departmentID}")`;
        connection.query(query, function (err, res) {
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
          message: "Enter the department name you want to add.\n",
          name: "department",
        },
      ])
      .then(function (res) {
        const department = res.department;
        const query = `INSERT INTO department (department_name) VALUE("${department}")`;
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          runApp();
        });
      });
  }

  //this is incomplete, using add employee as a starting point
  function updateEmployeeRole() {
    viewEmployees();

    inquirer
      .prompt({
        name: "employeeId",
        type: "input",
        message: "Enter the ID of the employee you want to update\n",
      })
      .then((answer) => {
        const employeeId = answer.employeeId;

        viewRoles();

        inquirer
          .prompt({
            name: "roleId",
            type: "input",
            message: "Enter the role ID you want them to have\n",
          })
          .then((answer) => {
            console.log("Updating employee role...\n");

            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  role_id: answer.roleId,
                },
                {
                  id: employeeId,
                },
              ],
              function (err, res) {
                if (err) throw err;
                console.log("the employee's role has been updated\n");
                runApp();
              }
            );
          });
      });
  }
}

runApp();
