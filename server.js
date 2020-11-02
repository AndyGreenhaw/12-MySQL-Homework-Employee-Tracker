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
let updateRoleTitleArr = [];
let managerArr = [];
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
    {
        type: "list",
        message: "Choose a manager for this employee.",
        choices: managerArr,
        name: "addEmployeeManager"
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
        choices: updateRoleTitleArr,
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

////////////////////////////////////////////////////
// ADD FUNCTIONS: ALL QUESTIONS RELATED TO ADDING //
////////////////////////////////////////////////////

// ADD DEPARTMENT
function addDepartment() {
    // Ask Create Department Questions
    inquirer.prompt(addDeptQ).then((res => {
        console.log("\n Inserting a new department...\n")
        // Set
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.addDeptName
            },

        // Print Success
        function(err,res) {
            if(err) throw err;
            console.log("New Department Added to Department Table!\n")
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
        };
    
        // Ask Create Role Questions
        inquirer.prompt(addRoleQ).then((res => {
            console.log("\n Inserting a new role...\n")

            // Convert Dept Name to Dept ID
            let addDeptID = (1+ deptNameArr.indexOf(res.addDeptName))

            // Insert New Data
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.addRoleTitle,
                    salary: res.addSalary,
                    department_id: addDeptID 
                },
            
            // Print Success
            function(err,res) {
                if(err) throw err;
                console.log("New Role Added to Role Table!\n")
                restart()
            });
        }));
    });
};

// ADD Employee
function addEmployee() {

    connection.query("SELECT * FROM role", function(err,res){
        if (err) throw err;

        // Fill Out the Role Array
        for(var i=0; i<res.length; i++){
            roleTitleArr.push((res[i].title))
        };

        // Fill Manager Name Array
        for(var i=0 ; i < managerNumber ; i++){
            managerArr.push(res[i].title)
        };
    
        // Ask Create Role Questions
        inquirer.prompt(addEmployeeQ).then((res => {
            console.log("\n Inserting a new employee...\n")

            // Convert Dept Name to Dept ID
            let addRoleId = (roleTitleArr.indexOf(res.addEmployeeRole)+1)

            // Convert Manager Name to Dept ID
            let addManagerId = (managerArr.indexOf(res.addEmployeeManager)+1)

            // Insert New Data
            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: res.addEmployeeFirstName,
                    last_name: res.addEmployeeLastName,
                    role_id: addRoleId,
                    manager_id: addManagerId
                },

            function(err,res) {
                if(err) throw err;
                console.log("New Employee Added to Employee Table!\n")
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

        // Format Data for User Readability
        for(var i=0; i<res.length; i++)
        console.log(
            " ----------" + "\n",
            "DEPARTMENT " + res[i].id + ": " + res[i].name + "\n",
            "----------" + "\n",
            );
        restart();
    });
};

// View Role
function viewRole(){

    connection.query("SELECT * FROM department", function(err,res){
        if(err) throw err;

        // Fill Out the Department Array
        for(var i=0; i<res.length; i++){
            deptNameArr.push((res[i].name))
        };
    
        connection.query("SELECT * FROM role", function(err,res){
            if(err) throw err;

            // Format Data for User Readability
            for(var i=0; i<res.length ; i++){

                console.log(
                    " ----------" + "\n",
                    "ROLE: " + (i+1) + "\n",
                    "----------" + "\n",
                    "Title: " + res[i].title + "\n",
                    "Salary: $" + res[i].salary + "\n",
                    // Add -1 to Offset Array Starting at 0
                    "Department: " + deptNameArr[((res[i].department_id)-1)] + "\n",
                    "Department ID: " + res[i].department_id + "\n",
                    // "Department Name: " + departmentName + "\n",
                    "----------" + "\n");
                
            };
            restart();
        });
    });
};

// View Employee
function viewEmployee(){
    connection.query("SELECT * FROM role", function(err,res){

        let roleTitleArr = [];

        // Fill Role Title Array
        for(var i=0; i<res.length; i++){
            roleTitleArr.push((res[i].title))       
        };
        
        connection.query("SELECT * FROM employee", function(err,res){
            if(err) throw err;

            // Fill Manager Name Array
            let managerNameTitle =[];
            for(var i=0 ; i < managerNumber ; i++){
                managerNameTitle.push(res[i].first_name + " " + res[i].last_name + " - " + roleTitleArr[i])
            };

            // Format Data for User Readability
            for(var i=0; i<res.length ; i++){
                console.log(
                    " ----------" + "\n",
                    "EMPLOYEE: " + (i+1) + "\n",
                    "----------" + "\n",
                    "Name: " + res[i].first_name + " " + res[i].last_name + "\n",
                    // Note: Added a -1 to Match Array Index Format
                    "Role: " + roleTitleArr[((res[i].role_id)-1)] + "\n", 
                    "Role ID: " + res[i].role_id + "\n",
                    // Note: Added a -1 to Match Array Index Format 
                    "Manager: " + managerNameTitle[(res[(i)].manager_id-1)] + "\n",
                    "----------" + "\n");
            };
            restart();
        });
    });
};

//////////////////////////
// UPDATE EMPLOYEE ROLE //
//////////////////////////

function updateEmployeeRole(){
    connection.query("SELECT * FROM role", function (err, res){
        if(err) throw err;

        // Fill Out Array for New Role Names to Update To
        for(var i=0; i < res.length ; i++){
            updateRoleTitleArr.push((res[i].title))    
        }

        console.log("READ:" + updateRoleTitleArr)
        
        connection.query("SELECT * FROM employee", function (err, res){
            if(err) throw err;

            // Fill Out the Employee Array
            for(var i=0; i<res.length; i++){
                employeeArr.push((res[(i)].first_name) + " " + (res[(i)].last_name))
            }

            inquirer.prompt(updateEmployeeQ).then((res => {
                console.log("\n Updating Employee Data...\n")

                // Convert Employee Name to ID
                // Note: Added 1 to Offset Array Index Format
                let employeeToUpdate = (employeeArr.indexOf(res.updateEmployee)+1)

                // Convert Role Title to ID
                // Note: Added 1 to Offset Array Index Format
                let updateRoleId = (updateRoleTitleArr.indexOf(res.updateNewEmployeeRole)+1)

                // Match Role ID to Employee
                // let roleMatch = []
                // for(var i=0; i<res.length; i++){
                //     roleTitleArr.push((res[i].title))       
                // };

                // Console Logs
                console.log(res.updateEmployee)
                // console.log("Old Role ID: " + res.role_id)
                console.log("New Role ID: " + updateRoleId)
                console.log("New Role: " + res.updateNewEmployeeRole + " " + updateRoleId)
                console.log()

                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: updateRoleId
                        },
                        {
                            id: employeeToUpdate
                        }
                    ],
                    function(err,res) {
                        if(err) throw err;
                        console.log(res.affectedRows + " \nEmployee Role Updated!\n");
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