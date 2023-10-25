const mysql = require('mysql2');
const inquirer = require('inquirer');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employment_db',
});

// Create a function to view departments
function viewDepartments(con, mainMenu) {
  const query = 'SELECT id, name AS department FROM department';
  con.query(query, (err, results) => {
    if (err) {
      console.error('Error viewing departments: ' + err);
      return;
    }
    console.table(results);
    mainMenu();
  });
}

// Create other functions for viewing roles, employees, and other operations
function viewRoles(con, mainMenu) {
    const query = 
    'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;'
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error viewing roles: ' + err);
        return;
      }
      console.table(results);
      mainMenu();
    });
};

function viewEmployees(con, mainMenu) {
    const query = `
    SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    roles.title AS job_title, 
    department.name AS department, 
    roles.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;`;
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error viewing employees: ' + err);
        return;
      }
      console.table(results);
      mainMenu();
    });
}

function addDepartment(con, mainMenu) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        const values = [answers.name];
  
        con.query(query, values, (err) => {
          if (err) {
            console.error('Error adding department: ' + err);
          } else {
            console.log('Department added successfully!');
          }
          mainMenu(); // Return to the main menu
        });
      });
}

function addRole(con, mainMenu) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      const values = [answers.title, answers.salary, answers.department_id];

      con.query(query, values, (err) => {
        if (err) {
          console.error('Error adding role: ' + err);
        } else {
          console.log('Role added successfully!');
        }
        mainMenu(); // Return to the main menu
      });
    });
}

function addEmployee(con, mainMenu) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:",
        },
        {
          type: 'input',
          name: 'role_id',
          message: "Enter the employee's role ID:",
        },
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the employee's manager's ID (or leave it blank if none):",
        },
      ])
      .then((answers) => {
        // Prepare an SQL query to insert the new employee into the "employee" table
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        const values = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null];
  
        con.query(query, values, (err) => {
          if (err) {
            console.error('Error adding employee: ' + err);
          } else {
            console.log('Employee added successfully!');
          }
          mainMenu(); // Return to the main menu
        });
      });
}

function updateEmployeeRole(con, mainMenu) {
    // First, you might want to fetch a list of employees to allow the user to select the one to update
    // Use a SELECT query for this
    const query = 'SELECT id, first_name, last_name FROM employee';
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching employees: ' + err);
        return;
      }
    });
      // Create an array of choices for the inquirer prompt
      const employeeChoices = results.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    inquirer
      .prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employeeChoices,
        },
      ])
      .then((employeeAnswers) => {
        // prompt the user to enter the new role ID
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'newRoleId',
              message: 'Enter the new role ID for the employee:',
            },
          ])
          .then((roleAnswers) => {
            // SQL query to update the employee's role
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            const values = [roleAnswers.newRoleId, employeeAnswers.employeeId];
  
            con.query(query, values, (err) => {
              if (err) {
                console.error('Error updating employee role: ' + err);
              } else {
                console.log('Employee role updated successfully!');
              }
              mainMenu(); // Return to the main menu
            });
          });
      });
  }
// Export the functions
module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
