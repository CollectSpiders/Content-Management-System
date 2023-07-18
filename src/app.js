const { mainPrompt } = require('./prompt');

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

const operationHandlers ={
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

const displayWelcomeMessage = () => {
    console.log(`Welcome to the Employee Tracker!`);
}

const runApplication = async () =>{
    displayWelcomeMessage();
    let exit = false;
    while (!exit){
        const { action } = await mainPrompt();
        
        if (action === "Exit"){
            exit = true;
        } else {
            const actionHandler = actionHandlers[action];
            if (actionHandler){
                await actionHandler();
            } else {
                console.log(`Invalid action: ${action}`);
            }
        }
    }
};

runApplication();