require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//creating the mysql connection

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employeeDB",
});

//connecting tothe server

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

//starting the app

function runApp() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What do you want to do?\n",
      //picking what to do
      choices: [
        "View Employees",
        "View Roles",
        "View Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee's Role",
        "Exit",
      ],
    })
    //switch cases to run the different choices
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

    //creating a table of all the employees in the employee database
  function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n Employee List\n")
      console.table(res);
      
    });
  }

  //creating a table of all the roles in the role database
  function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n List of Roles\n")
      console.table(res);
      
    });
  }

  //creating a table of all the departments in the department database
  function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n\n List of Departments\n")
      console.table(res);
      
    });
  }

  //a prompt to add an employee and asking all the fields
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
      //creating const of the responses to be added to the database
      .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const managerID = res.managerID;
        //SQL template literal that is sent as a query to the MySQL database
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          runApp();
        });
      });
  }
  //a variation of the last function geared towards adding a role
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
  //same but for adding a department
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

  //Uses the update method to update an employee role
  function updateEmployeeRole() {
    //added to remind the user of employees
    viewEmployees();
    //entering the employeeID
    inquirer
      .prompt({
        name: "employeeId",
        type: "input",
        message: "Enter the ID of the employee you want to update\n",
      })
      .then((answer) => {
        const employeeId = answer.employeeId;
        //added to remind the user of roless
        viewRoles();

        inquirer
          .prompt({
            name: "roleId",
            type: "input",
            message: "Enter the role ID you want them to have\n",
          })
          .then((answer) => {
            console.log("Updating employee role...\n");
            //setting the roleID at the employeeID
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
