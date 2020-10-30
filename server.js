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
    choices: ["Add Item", "View Item", "Update Employee Role"],
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

/////////////////////////////////////
// QUESTION OBJECTS: ADD FUNCTIONS //
/////////////////////////////////////

// Establish Current Number of Managers
const managerNumber = 5;

// Establish Arrays
let deptNameArr = [];
let roleTitleArr = [];
let managerFirstNameArr = [];
let managerLastNameArr = [];
let employeeArr = [];

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

///////////////////////////////////////////
// QUESTION OBJECT: UPDATE EMPLOYEE ROLE //
///////////////////////////////////////////

const updateEmployeeQ = 
[
    {
        type: "list",
        message: "Choose the employee who's role you would like to update.",
        choices: employeeArr,
        name: "updateEmployee"
    },
    {
        type: "list",
        message: "Choose the new role you would like to apply to this employee",
        choices: roleTitleArr,
        name: "updateNewEmployeeRole"
    }
]

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
        } else if (res.actionItem === "Update Employee Role"){
            updateEmployeeRole()
        };
    }));
};

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
};

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
};

// UPDATE WHAT?
// function updateItem() {
//     inquirer.prompt(updateQ).then((res => {
//         if(res.updateChoice === "Department"){
//             updateDepartment()
//         } else if (res.updateChoice === "Role"){
//             updateRole()
//         } else if (res.updateChoice === "Employee"){
//             updateEmployee()
//         };
//     }));
// };

////////////////////////////////////////////////////
// ADD FUNCTIONS: ALL QUESTIONS RELATED TO ADDING //
////////////////////////////////////////////////////

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
            restart()
        });
    }));
};

// ADD ROLE
function addRole() {
    
    connection.query("SELECT * FROM department ", function(err,res){
        if(err) throw err;

        // Fill Out the Department Array
        for(var i=0; i<res.length; i++){
            deptNameArr.push((res[i].name))
            console.log("READ " + deptNameArr)
        };
    
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
                restart()
                console.log(res.affectedRows + " department inserted!\n")
            });
        }));
    });
};

// ADD Employee
function addEmployee() {

    connection.query("SELECT role.title, role.id FROM role", function(err,res){
        if (err) throw err

        // Fill Out the Role Array
        for(var i=0; i<res.length; i++){
            roleTitleArr.push((res[i].title))
        };
    
        // Ask Create Role Questions
        inquirer.prompt(addEmployeeQ).then((res => {

            // Convert Dept Name to Dept ID
            let addRoleId = (1 + roleTitleArr.indexOf(res.addEmployeeRole))
            console.log("READ" + addRoleId)

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
                restart()
            });
        }));
    });
};

/////////////////////////////////////////////////////
// VIEW FUNCTIONS: ALL QUESTIONS RELATED TO ADDING //
/////////////////////////////////////////////////////

// View Department
function viewDepartment(){
    connection.query("SELECT * FROM department", function(err,res){
        if(err) throw err;
        console.log(res);
        restart();
    });
};

// View Role
function viewRole(){
    connection.query("SELECT * FROM role", function(err,res){
        if(err) throw err;

        for(var i=0; i<res.length ; i++){
            
            // Convert Department ID to Name
            // deptNameArr.push((res[i].name))

            // let departmentName = deptNameArr[i];
            // console.log("READ2" + departmentName)
            // console.log("READ3" + deptNameArr[i])
            // console.log("READ" + deptNameArr)

            console.log(
                "ROLE ID: " + (i+1) + ":" + "\n",
                "----------" + "\n",
                "Title: " + res[i].title + "\n",
                "Salary: $" + res[i].salary + "\n",
                "Department ID: " + res[i].department_id + "\n",
                // "Department Name: " + departmentName + "\n",
                "----------" + "\n");
            
        };
        restart();
    });
};

// View Employee
function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err,res){
        if(err) throw err;

        // Fill Manager Name Arrays
        let managerFirstNameArr =[];
        let managerLastNameArr = [];
        for(var i=0 ; i < managerNumber ; i++){
            managerFirstNameArr.push(res[i].first_name)
            managerLastNameArr.push(res[i].last_name)
        };

        // Print Data
        for(var i=0; i<res.length ; i++){
            console.log(
                "EMPLOYEE ID: " + (i+1) + ":" + "\n",
                "----------" + "\n",
                "Name: " + res[i].first_name + res[i].last_name + "\n",
                "Role ID: " + res[i].role_id + "\n",
                "Manager: " + managerFirstNameArr[i] + " " + managerLastNameArr[i] + "\n",
                "----------" + "\n");
        };
        console.log("READ" + managerFirstNameArr[0]);
        restart();
    });
};

//////////////////////////
// UPDATE EMPLOYEE ROLE //
//////////////////////////

function updateEmployeeRole(){
    connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employee", function (err, res){
        if(err) throw err;

        // Fill Out the Employee Array
        for(var i=0; i<res.length; i++){
            employeeArr.push((res[i].first_name) + " " + (res[i].last_name))
        }
        
        connection.query("SELECT role.title, role.id FROM role", function (err, res){
            if(err) throw err;

            // Fill Out the Role Array
            for(var i=0; i<res.length; i++){
                roleTitleArr.push((res[i].title))
            }
        
            inquirer.prompt(updateEmployeeQ).then((res => {

                // Convert Arrays to IDs
                let updateEmployeeId = (1 + employeeArr.indexOf(res.updateEmployee))
                let updateRoleId = (1 + roleTitleArr.indexOf(res.updateNewEmployeeRole))

                console.log("READ " + updateRoleId)
                console.log("READ " + updateEmployeeId)

                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: updateRoleId
                        },
                        {
                            id: updateEmployeeId
                        }
                    ],

                    function(err,res) {
                        if(err) throw err;
                        console.log(res.affectedRows + " Employee Role Updated!\n");
                        restart();
                    }
                );
            }));
    
        });
    });
};

////////////////////////
// TRY AGAIN FUNCTION //
////////////////////////

function restart(){
    inquirer.prompt(
        {
            type: "list",
            message: "Would you like to do add, view, or update any other entries?",
            choices: ["Yes","No"],
            name: "restart"
        }
    ).then((res => {
        if(res.restart === "Yes"){
            firstQuestion();
        } else {
            console.log("Have a Great Day!");
        };
    }));
};