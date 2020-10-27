// REQUIRES
const mysql = require("mysql");
const inquirer = require("inquirer");

// LOGIN
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "easybeagle",
  database: "employeeTracker"
  
});

// CONNECT
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  firstQuestion();
});

//////////////////////////////
// STARTER QUESTION OBJECTS //
//////////////////////////////

// First Question
const firstQ = {
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Item", "View Item", "Update Item"],
    name: "actionItem"
}

// Add Prompt
const addQ = {
    type: "list",
    message: "What would you like to add?",
    choices: ["Department", "Role", "Employee"],
    name: "addChoice"
}

// View Prompt
const viewQ = {
    type: "list",
    message: "What would you like to view?",
    choices: ["Department", "Role", "Employee"],
    name: "viewChoice"
}

// Update Prompt
const updateQ = {
    type: "list",
    message: "What would you like to update?",
    choices: ["Department", "Role", "Employee"],
    name: "updateChoice"
}

//////////////////////////
// ADD QUESTION OBJECTS //
//////////////////////////

// Add Department
const addDeptQ = {
    type: "input",
    message: "Enter the name of the department you would like to add.",
    name: "newDeptName"
}

// Add Role
const addRoleQ = {
    type: "input",
    message: "Enter the name of the role you would like to add.",
    name: "newRoleName"
}

// Add Employee
const addEmployeeQ = {
    type: "input",
    message: "Enter the name of the employee you would like to add.",
    name: "newEmployeeName"
}


//////////////////////////////
// STARTER QUESTION PROMPTS //
//////////////////////////////

// FIRST QUESTION

function firstQuestion() {
    inquirer.prompt(firstQ).then((res => {
        if(res.actionItem === "Add Item"){
            addItem()
        } else if (res.actionItem === "View Item"){
            viewItem()
        } else if (res.actionItem === "Update Item"){
            updateItem()
        };
    }));
}

// ADD WHAT?
function addItem() {
    inquirer.prompt(addQ).then((res => {
        if(res.addChoice === "Department"){
            addDepartment()
        } else if (res.addChoice === "Role"){
            addRole()
        } else if (res.addChoice === "Employee"){
            addEmployee()
        };
    }));
}

// VIEW WHAT?
function viewItem() {
    inquirer.prompt(viewQ).then((res => {
        if(res.viewChoice === "Department"){
            viewDepartment()
        } else if (res.viewChoice === "Role"){
            viewRole()
        } else if (res.viewChoice === "Employee"){
            viewEmployee()
        };
    }));
}

// UPDATE WHAT?
function updateItem() {
    inquirer.prompt(updateQ).then((res => {
        if(res.updateChoice === "Department"){
            updateDepartment()
        } else if (res.updateChoice === "Role"){
            updateRole()
        } else if (res.updateChoice === "Employee"){
            updateEmployee()
        };
    }));
}

////////////////////////////////////////////////
// ADD GROUP: ALL QUESTIONS RELATED TO ADDING //
////////////////////////////////////////////////

// ADD DEPARTMENT
function addDepartment() {
    inquirer.prompt(addDeptQ).then((res => {
        console.log("Inserting a new department...\n")
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.newDeptName
            },
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " department inserted!\n")
        })
    }))
}

// ADD ROLE
function addRole() {
    inquirer.prompt(addRoleQ).then((res => {
        console.log("Inserting a new role...\n")
        var query = connection.query(
            "INSERT INTO role SET ?",
            {
                name: res.newRoleName
            },
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " department inserted!\n")
        })
    }))
}

// ADD EMPLOYEE
function addEmployee() {
    inquirer.prompt(addEmployeeQ).then((res => {
        console.log("Inserting a new employee...\n")
        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                name: res.newEmployeeName
            },
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " department inserted!\n")
        })
    }))
}




////////////////////////////////////////////////////////
// function afterConnection() {
//     connection.query("SELECT * FROM role", function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
// }