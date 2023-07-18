const {
    addEmployeePrompt,
    addRolePrompt,
    addDepartmentPrompt,
    deleteObjectPrompt,
    updateEmployeeRolePrompt,
    updateEmployeeManagerPrompt
} = require('./prompt');

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

const viewAllEmployees = async () =>{
    const employees = await getEmployees();
    console.table(employees);
};

const viewAllRoles = async () =>{
    const roles = await getRoles();
    console.table(roles);
};

const viewAllDepartments = async () =>{
    const departmens = await getDepartments();
    console.table(departments);
};

const addEmployee = async () =>{
    const {
        employeeFirtName,
        employeeLastName,
        employeeRole,
        employeeManager
    } = await addEmployeePrompt();
    await createEmployee(
        employeeFirtName,
        employeeLastName,
        employeeRole,
        employeeManager
    );
    console.log(`\n ${employeeFirtName} ${employeeLastName} has been added to the database`);
};

const updateEmployeeRoleAction = async () =>{
    const { employeeToUpdate, newRole } = await updatedEmployeeRolePrompt();
    await updateEmployeeRolePrompt(employeeToUpdate, newRole);
    console.log(`\n Successfully updated employee role \n`)
};

const updateEmployeeManagerAction = async () =>{
    const { employeeToUpdate, newManager } = await updateEmployeeManagerPrompt();
    await updateEmployeeManager(employeeToUpdate, newManager);
    console.log(`/n Successfully updated employee manager \n`)
};

const deleteObjectAction = async () =>{
    const { objectType, departmentToDelete, roleToDelet, employeeToDelete } = await deleteObjectPrompt();
    await deleteObject(objectType || employeeToDelete || roleToDelet || departmentToDelete);
    console.log(`\n Successfully deleted ${objectType}`);
};

module.export = {
    viewAllEmployees,
    viewAllRoles,
    viewAllDepartments,
    addEmployee,
    updateEmployeeRoleAction,
    updateEmployeeManagerAction,
    deleteObjectAction
};