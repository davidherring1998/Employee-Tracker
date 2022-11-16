const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { connect } = require("./config/connection");

function main() {
  inquirer
    .prompt({
      name: "initialPage",
      type: "list",
      choices: [
        "View all departments",
        "View all employees",
        "View all roles",
        "Add a department",
        "Add a employee",
        "Add a role",
        "Update existing employee role",
      ],
    })
    .then((res) => {
      const answer = res.initialPage;
      if (answer === "View all departments") {
        viewDepartments();
      } else if (answer === "View all employees") {
        viewEmployees();
      } else if (answer === "View all roles") {
        viewRoles();
      } else if (answer === "Add a department") {
        addDepartment();
      } else if (answer === "Add a employee") {
        addEmployee();
      } else if (answer === "Add a role") {
        addRoles();
      } else if (answer === "Update existing employee role") {
        updateEmployeeRole();
      } else {
        console.log("Error, please enter a valid entry.");
      }
    });
}

function viewDepartments() {
  const data = `SELECT * FROM DEPARTMENT`;
  connect.query(data, (err, res) => {
    if (res) {
      console.table(res);
    }
    main();
  });
}

function viewEmployees() {
  const data = `SELECT * FROM employees`;
  connect.query(data, (err, res) => {
    if (res) {
      console.table(res);
    }
    main();
  });
}

function viewRoles() {
  const data = `SELECT * FROM roles`;
  connect.query(data, (err, res) => {
    if (res) {
      console.table(res);
    }
    main();
  });
}

function addDepartment() {
  const data = `SELECT * FROM department`;
  connect.query(data, (err, res) => {
    if (res) {
      console.table(res);
    }
    inquirer
      .prompt({
        type: "input",
        name: "addDept",
        message: "New department name?",
      })
      .then((answer) => {
        connect.query("INSERT INTO department SET ?", {
          department_name: answer.addDept,
        });
        viewDepartments();
      });
  });
}

function addRoles() {
  const data = `SELECT DISTINCT * FROM roles`;
  connect.query(data, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "addTitle",
          message: "Add new role title.",
        },
        {
          type: "input",
          name: "addSalary",
          message: "Add new role salary.",
        },
        {
          type: "input",
          name: "addDeptId",
          message: "Add new role department id.",
          validate: (input) => {
            if (isNaN(input)) {
              console.log("please enter a valid department number.");
              return false;
            } else {
              return true;
            }
          },
        },
      ])
      .then((answer) => {
        connect.query("INSERT INTO roles SET ?", {
          job_title: answer.addTitle,
          salary: answer.addSalary,
          department_id: answer.addDeptId,
        });
        viewDepartments();
      });
  });
}

function addEmployee() {
  const data = `SELECT DISTINCT * FROM employees`;
  connect.query(data, (err, res) => {
    connect.query(data, (err, res) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "input",
            name: "fname",
            message: "Please enter first name.",
          },
          {
            type: "input",
            name: "lname",
            message: "Please enter last name.",
          },
          {
            type: "input",
            name: "deptId",
            message: "Please enter department id.",
          },
          {
            type: "input",
            name: "jobTitle",
            message: "Please enter job title.",
          },
          {
            type: "input",
            name: "salary",
            message: "Please enter salary.",
          },
          {
            type: "input",
            name: "manager",
            message: "Please enter reporting manager.",
          },
        ])
        .then((answer) => {
          connect.query("INSERT INTO employees SET ?", {
            first_name: answer.fname,
            last_name: answer.lname,
            dept_id: answer.deptId,
            job_title: answer.jobTitle,
            salary: answer.salary,
            manager_name: answer.manager,
          });
          viewDepartments();
        });
    });
  });
}

function updateEmployeeRole() {
  const data = `SELECT DISTINCT * FROM employees`;
  connect.query(data, (err, employee_result) => {
    connect.query(data, `SELECT * FROM roles`, (err, role_result) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: () =>
              employee_result.map(
                (employee_result) => employee_result.first_name
              ),
          },
          {
            type: "list",
            name: "employeeRole",
            message: "Which role do you want to assign the selected employee?",
            choices: () =>
              role_result.map((role_result) => role_result.job_title),
          },
        ])
        .then((answer) => {
          const updateSQL = `UPDATE employees SET job_title = ?  WHERE first_name = ?`;
          const results = [answer.employeeRole, answer.employee];
          connect.query(updateSQL, results, (req, res) => {
            console.log("Employee has been updated.");
          });
          main();
        });
    });
  });
}


main();
