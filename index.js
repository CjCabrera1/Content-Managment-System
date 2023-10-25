const mysql = require('mysql2');
const inquirer = require('inquirer');
const ef = require('./employeeFunctions');

// start up connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employment_db',
});

function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menuChoice',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
          ],
        },
      ])
      .then((answers) => {
        // Handle user's choice here
        const choice = answers.menuChoice;
        // Call corresponding functions based on the user's choice
        if (choice === 'View all departments') {
          ef.viewDepartments(con, mainMenu);
        } else if (choice === 'View all roles') {
          ef.viewRoles(con, mainMenu);
        } else if (choice === 'View all employees') {
          ef.viewEmployees(con, mainMenu);
        } else if (choice === 'Add a department') {
          ef.addDepartment(con, mainMenu);
        } else if (choice === 'Add a role') {
          ef.addRole(con, mainMenu);
        } else if (choice === 'Add an employee') {
          ef.addEmployee(con, mainMenu);
        } else if (choice === 'Update an employee role') {
          ef.updateEmployeeRole(con, mainMenu);
        }
      });
}

  // Call the main menu function to start the application
  mainMenu();
  