// Importing the main prompt
const inquierer = require('inquirer');
const { mainPrompt } = require('./prompt');

// Importing the required function calls
const {
    viewAllEmployees,
    viewAllRoles,
    viewAllDepartments,
    addEmployee,
    addRole,
    addDepartment,
    updateEmployeeRoleAction,
    updateEmployeeManagerAction,
    deleteObjectAction
} = require('./calls');

// Mapping each operation to its corresponding handler
const operationHandlers = {
    "View all employees": viewAllEmployees,
    "View all roles": viewAllRoles,
    "View all departments": viewAllDepartments,
    "Add employee": addEmployee,
    "Add role": addRole,
    "Add department": addDepartment,
    "Update employee role": updateEmployeeRoleAction,
    "Update employee manager": updateEmployeeManagerAction,
    "Delete object": deleteObjectAction
};

// Displaying the welcome message
const displayWelcomeMessage = () => {
    console.log(`Welcome to the Employee Tracker!`);
}

// Running the application
const runApplication = async () => {
    displayWelcomeMessage();
    let exit = false;
    while (!exit) {
        const { action } = await mainPrompt();

        if (action === "Exit") {
            exit = true;
        } else {
            const actionHandler = operationHandlers[action];
            if (actionHandler) {
                await actionHandler();
            } else {
                console.log(`Invalid action: ${action}`);
            }
        }
    }
};

runApplication();