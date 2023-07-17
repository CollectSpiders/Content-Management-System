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
    ]);
};

// menu for adding a new employee
const addEmployeePrompt = async () => {
    const roleChoices = await getRoles();
    const managers = await getManagers();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employee\'s role?',
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the employee\'s manager?',
            choices: [...managerChoices, { name: 'None', value: null }]
        }
    ]);
};

const addRolePrompt = async () =>{
    const departmentChoices = await getDepartments();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the role\'s title?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the role\'s salary?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'What is the role\'s department?',
            choices: departmentChoices
        }
    ]);
};

const addDepartmentPrompt = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the department\'s name?'
        }
    ]);
};

const deleteObjectPrompt = async () =>{
    const departmentChoices = await getDepartments();
    const roleChoices = await getRoles();
    const employeeData = await getEmployees();
    const employeeChoices = employeeData.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
    return inquirer.prompt([
        {
            type: 'list',
            name: 'objectType',
            message: 'What type of object would you like to delete?',
            choices: [
                { name: 'Department', value: 'department' },
                { name: 'Role', value: 'role' },
                { name: 'Employee', value: 'employee' }
            ]
        },
        {
            type: 'list',
            name: 'employeeToDelete',
            message: 'Which employee would you like to delete?',
            choices: employeeChoices,
            when: (answers) => answers.objectType === 'employee'
        },
        {
            type: 'list',
            name: 'roleToDelete',
            message: 'Which role would you like to delete?',
            choice: roleChoices,
            when: (answers) => answers.objectType === 'role'
        },
        {
            type: 'list',
            name: 'departmentToDelete',
            message: 'Which department would you like to delete?',
            choices: departmentChoices,
            when: (answers) => answers.entityType === 'department'
        }
])};

