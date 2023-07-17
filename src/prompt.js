const { getDepartments, getRoles, getEmployees, getManagers } = require('./operations');
const inquirer = require('inquierer');

// main menu commands
const mainPrompt = () =>{
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'View Managers',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Delete employee, role, or department',
            ]
        }
    ])
}