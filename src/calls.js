// Importing prompt functions
const {
    addEmployeePrompt,
    addRolePrompt,
    addDepartmentPrompt,
    deleteObjectPrompt,
    updateEmployeeRolePrompt,
    updateEmployeeManagerPrompt
} = require('./prompt');

// Importing database operations
const {
    getEmployees,
    getRoles,
    getManagers,
    getDepartments,
    createEmployee,
    createRole,
    createDepartment,
    deleteObject,
    updateEmployeeRole,
    updateEmployeeManager
} = require('./operations');

// View all employees
const viewAllEmployees = async () => {
    const employees = await getEmployees();
    console.table(employees);
};

// View all roles
const viewAllRoles = async () => {
    const roles = await getRoles();
    console.table(roles);
};

// View all departments
const viewAllDepartments = async () => {
    const departments = await getDepartments();
    console.table(departments);
};

// Add an employee
const addEmployee = async () => {
    const {
        employeeFirstName,
        employeeLastName,
        employeeRole,
        employeeManager
    } = await addEmployeePrompt();

    await createEmployee(
        employeeFirstName,
        employeeLastName,
        employeeRole,
        employeeManager
    );

    console.log(`\n ${employeeFirstName} ${employeeLastName} has been added to the database`);
};

// Add a role
const addRole = async () =>{
    const { roleName } = await addRolePrompt();
    await createRole(roleName);
    console.log(`\n Successfully created ${roleName} to the database \n`);
};

// Add a department
const addDepartment = async () =>{
    const { departmentName } = await addDepartmentPrompt();
    await createDepartment(departmentName);
    console.log(`\n Successfully created ${departmentName} to the database \n`);
};

// Update an employee's role
const updateEmployeeRoleAction = async () => {
    const { employeeToUpdate, newRole } = await updateEmployeeRolePrompt();
    await updateEmployeeRole(employeeToUpdate, newRole);
    console.log(`\n Successfully updated employee role \n`);
};

// Update an employee's manager
const updateEmployeeManagerAction = async () => {
    const { employeeToUpdate, newManager } = await updateEmployeeManagerPrompt();
    await updateEmployeeManager(employeeToUpdate, newManager);
    console.log(`\n Successfully updated employee manager \n`);
};

// Delete an object (employee, role, department)
const deleteObjectAction = async () => {
    const { objectType, departmentToDelete, roleToDelete, employeeToDelete } = await deleteObjectPrompt();
    await deleteObject(objectType || employeeToDelete || roleToDelete || departmentToDelete);
    console.log(`\n Successfully deleted ${objectType}`);
};

module.exports = {
    viewAllEmployees,
    viewAllRoles,
    viewAllDepartments,
    addEmployee,
    updateEmployeeRoleAction,
    updateEmployeeManagerAction,
    deleteObjectAction,
    addDepartment,
    addRole
};