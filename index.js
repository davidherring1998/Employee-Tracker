const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { connect } = require("./config/connection");

// const works = () => {
//   console.log("working");
// };

function main() {
  inquirer
    .prompt({
      name: "initialPage",
      type: "list",
      choices: [
        "view all departments",
        "view all employees",
        "view all roles",
        "add a department",
        "add a employee",
        "add a role",
        "update existing employee role",
        "main view",
      ],
    })
    .then((res) => {
      const answer = res.initialPage;
      if (answer === "view all departments") {
        viewDepartments();
      } else if (answer === "view all employees") {
        viewEmployees();
      } else if (answer === "view all roles") {
        viewRoles();
      } else if (answer === "add a department") {
        addDepartment();
      } else if (answer === "add a employee") {
        addEmployee();
      } else if (answer === "add a role") {
        addRoles();
      } else if (answer === "update existing employee role") {
        updateEmployeeRole();
      } else if (answer === "main view") {
        main();
      } else {
        console.log("error, please enter a valid entry.");
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
        message: "add new department name",
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
          message: "add new role title",
        },
        {
          type: "input",
          name: "addSalary",
          message: "add new role salary",
        },
        {
          type: "input",
          name: "addDeptId",
          message: "add new role department id",
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
            message: "Please enter first name",
          },
          {
            type: "input",
            name: "lname",
            message: "please enter last name",
          },
          {
            type: "input",
            name: "deptId",
            message: "please enter department id",
          },
          {
            type: "input",
            name: "jobTitle",
            message: "please enter job title",
          },
          {
            type: "input",
            name: "salary",
            message: "please enter salary",
          },
          {
            type: "input",
            name: "manager",
            message: "please enter reporting manager",
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
  const data = `SELECT * FROM employees`;
  connect.query(data, (err, employee_result) => {
    connect.query(`SELECT * FROM roles`, (err, title_result) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: () =>
              employee_result.map(
                (employee_result) =>
                  employee_result.first_name + " " + employee_result.last_name,
              ),
          },
          {
            type: "list",
            name: "employeeRole",
            message: "Which role do you want to assign the selected employee?",
            choices: () =>
              title_result.map((title_result) => title_result),
          },
        ])
        .then((answer) => {
            console.log('works')
        });
      main();
    });
  });
}

main();
