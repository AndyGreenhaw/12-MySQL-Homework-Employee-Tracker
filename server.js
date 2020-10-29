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

let deptNameArr = [];
let deptIdArr = []; 
let roleTitleArr = [];
let roleIdArr = [];
let managerNameArr = [];
let managerIdArr = [];

// Add Department
const addDeptQ = {
    type: "input",
    message: "Enter the name of the department you would like to add.",
    name: "addDeptName"
}

// Add Role
const addRoleQ = [
    {
        type: "input",
        message: "Enter the name of the role you would like to add.",
        name: "addRoleTitle"
    },
    {
        type: "input",
        message: "Enter the starting salary for this role.",
        name: "addSalary"
    },
    {
        type: "list",
        message: "Choose a department for this role.",
        choices: deptNameArr,
        name: "addDeptName"
    },
]

// Add Employee
const addEmployeeQ = 
[
    {
        type: "input",
        message: "Enter the first name of the employee you would like to add.",
        name: "addEmployeeFirstName"
    },
    {
        type: "input",
        message: "Enter the last name of the employee you would like to add.",
        name: "addEmployeeLastName"
    },
    {
        type: "list",
        message: "Choose a role for this employee.",
        choices: roleTitleArr,
        name: "addEmployeeRole"
    },
]
//////////////////////////
// UPDATE QUESTION OBJECTS //
//////////////////////////

// // Update Department
// const updateDeptQ = [
//     {
//     type: "list",
//     message: "Choose the department you would like to update.",
//     choices: deptNameArr,
//     name: "choiceDept"
//     },
//     {
//     type: "input",
//     message: "Enter a new name for this department.",
//     name: "newDeptName"
//     },
// ]

// // Update Role
// const updateRoleQ = {
//     type: "input",
//     message: "Enter the name of the role you would like to update.",
//     choices: roleArr,
//     name: "upRoleName"
// }

// // Update Employee
// const updateEmployeeQ = {
//     type: "input",
//     message: "Enter the name of the employee you would like to update.",
//     choices: employeeArr,
//     name: "upEmployeeName"
// }


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
    // Ask Create Department Questions
    inquirer.prompt(addDeptQ).then((res => {
        console.log("Inserting a new department...\n")
        // Set
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.addDeptName
            },
        function(err,res) {
            if(err) throw err;
            console.log(res.affectedRows + " department inserted!\n")
        })
    }))
}

// ADD ROLE
function addRole() {
    
    connection.query("SELECT * FROM department", function(err,res){
        if(err) throw err;

        // Fill Out the Department Array
        for(var i=0; i<res.length; i++){
            deptNameArr.push((res[i].name))
            console.log("READ " + deptNameArr)
        }
    
        // Ask Create Role Questions
        inquirer.prompt(addRoleQ).then((res => {

            // Convert Dept Name to Dept ID
            let addDeptID = (1+ deptNameArr.indexOf(res.addDeptName))
            console.log("READ" + addDeptID)

            console.log("Inserting a new role...\n")

            // Insert New Data
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.addRoleTitle,
                    salary: res.addSalary,
                    department_id: addDeptID 
                },

            function(err,res) {
                if(err) throw err;
                console.log(res.affectedRows + " department inserted!\n")
            })
        }))
    })
}

// ADD Employee
function addEmployee() {

    connection.query("SELECT role.title, role.id FROM role", function(err,res){
        if (err) throw err

        // Fill Out the Department Array
        for(var i=0; i<res.length; i++){
            roleTitleArr.push((res[i].title))
            console.log("READ " + roleTitleArr)
        }
    
        // Ask Create Role Questions
        inquirer.prompt(addEmployeeQ).then((res => {

            // Convert Dept Name to Dept ID
            let addRoleId = (1 + roleTitleArr.indexOf(res.addEmployeeRole))
            console.log("READ" + addRoleId)

            console.log("Inserting a new role...\n")

            // Insert New Data
            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: res.addEmployeeFirstName,
                    last_name: res.addEmployeeLastName,
                    role_id: addRoleId 
                },

            function(err,res) {
                if(err) throw err;
                console.log(res.affectedRows + " employee inserted!\n")
            })
        }))
    })
}










////////////////////////////////////////////////
// UPDATE GROUP: ALL QUESTIONS RELATED TO ADDING //
////////////////////////////////////////////////

// // UPDATE DEPARTMENT
// function updateDepartment() {
//     connection.query("SELECT * FROM department", function(err,res){

//         for(var i=0; i<res.length; i++){
//             deptNameArr.push((res[i].id))
//             console.log(res[i].id);
//         }
    
//     inquirer.prompt(updateDeptQ).then((res => { // Asks User to Choose Department to Update
//         console.log("Loading Department to Update...\n")
        
//         var query = connection.query(
//             "UPDATE department SET ? WHERE ?",
//             [
//                 {
//                     name: res.upDeptName
//                 },
//                 {
//                     id: res.id
//                 }
//             ],
//         function(err,res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " department updated!\n");
//         })
//     }))
// })
// }

// // UPDATE ROLE
// function updateRole() {
//     inquirer.prompt(updateRoleQ).then((res => {
//         console.log("Updating role...\n")
//         var query = connection.query(


// // START WORKING HERE - LOOK FOR UPDATE CODE IN ICE CREAM STUFF


//             "INSERT INTO role SET ?",
//             {
//                 name: res.newRoleTitle
//             },
//         function(err,res) {
//             if(err) throw err;
//             console.log(res.affectedRows + " department inserted!\n")
//         })
//     }))
// }

// // UPDATE EMPLOYEE
// function updateEmployee() {
//     inquirer.prompt(updateEmployeeQ).then((res => {
//         console.log("Inserting a new employee...\n")
//         var query = connection.query(


// // START WORKING HERE - LOOK FOR UPDATE CODE IN ICE CREAM STUFF


//             "INSERT INTO employee SET ?",
//             {
//                 name: res.newEmployeeName
//             },
//         function(err,res) {
//             if(err) throw err;
//             console.log(res.affectedRows + " department inserted!\n")
//         })
//     }))
// }


////////////////////////////////////////////////////////
// function afterConnection() {
//     connection.query("SELECT * FROM role", function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
// }