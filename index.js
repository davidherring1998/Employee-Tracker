const inquirer = require('inquirer');
const consoleTable = require('console.table');
const {connect} = require('./config/connection')


const works = () => {console.log('working')}

function main () {
  inquirer.prompt({
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
        "main view"
    ],
  })
  .then((res) => {
    const answer = res.initialPage
    if(answer === 'view all departments') {
        viewDepartments()
    } else if (answer === 'view all employees'){
        viewEmployees()
        works();
    } else if (answer === 'view all roles'){
        viewRoles()
        works();
    } else if (answer === 'add a department') {
        addDepartment()
        works();
    } else if (answer === 'add a employee') {
        addEmployee()
        works();
    } else if (answer === 'add a role'){
        addRoles();
        works();
    } else if (answer === 'update existing employee role'){
        updateEmployee()
        works();
    } else if (answer === 'main view') {
        main();
    } else {
        console.log('error, please enter a valid entry.')
    }
  })
}

// to exit back into main view
function exit () {
    main();
}

function viewDepartments () {
    const data = `SELECT * FROM DEPARTMENT`;
    connect.query(data, (err, res) => {
        if(res) {
            console.table(res);
        }
        main();
    });
}

function viewEmployees () {
    const data = `SELECT * FROM employees`;
    connect.query(data, (err, res) => {
        if(res) {
            console.table(res);
        }
        main();
    })
}

function viewRoles () {
    const data = `SELECT * FROM roles`;
    connect.query(data, (err, res) => {
        if(res) {
            console.table(res);
        }
        main();
    })
    
}

function addDepartment () {
    const data = `SELECT * FROM department`;
    connect.query(data, (err, res) => {
        if(res) {
            console.table(res);
        }
            inquirer.prompt({
                type: "input",
                name: "addDept",
                message: "add new department name"
            })
            .then((answer) => {
                connect.query('INSERT INTO department SET ?', 
                {
                    department_name: answer.addDept,
                })
                viewDepartments();
            })
    })
}

function addRoles () {
    const data = `SELECT * FROM roles`;
    connect.query(data, (err, res) => {
        if(res) {
            console.table(res);
        }
            inquirer.prompt({
                type: "input",
                name: "addTitle",
                message: "add new role title"
            }, {
                type: "input",
                name: "addSalary",
                message: "add new role salary"
            }, {
                type: "input",
                name: "addDeptId",
                message: "add new role department id"
        })
            .then((answer) => {
                connect.query('INSERT INTO roles SET ?', 
                {
                    job_title: answer.addTitle,
                    salary: answer.addSalary,
                    department_id: answer.addDeptId,
                })
                viewDepartments();
            })
    })
}

function  updateEmployee () {
    works()
}


main();