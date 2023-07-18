const mysql = require('mysql2/promise')
require('dotenv').config();

// confiduration for the database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// fetches employees from database
const getEmployees = async () =>{
    try {
        // SQL query to retrieve employee information
        const query = `
        SELECT e.id, e.first_name, e.last_name, r.title AS roles, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        LEFT JOIN employees m ON e.manager_id = m.id
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        ORDER BY e.id;
      `;
      // execute query & retrieve rows
        const [rows] = await connection.query(query);
        // return the retrieved rows
        return rows;
    } catch (err) {
        console.error('Error fetching employees:', err);
    } finally {
        // closes connection to database
        await connection.end();
    }
} catch (err) {
    console.error('Error connecting to the database:', err);
}

// retrieves roles from database 
const getRoles = async () =>{
    try {
        // establishes a connection to database
        const connection = await mysql.createConnection(dbConfig);
        try {
            // defines an SQL query to fetch role information & department details
            const query =  `
            SELECT r.id, r.title, d.name AS department, r.salary
            FROM roles r
            INNER JOIN departments d ON r.department_id = d.id
            `;
            // Execute the query and retrieve results
            const [rows] = await connection.query(query);
            // transform the rows into an array of objects with desired properties
            return rows.map(row => ({name: row:DataTransferItemList, value: row.id, department: row.department, salary: row.salary}));
        } catch (err) {
            console.error('Error fetching roles: ',err);
        } finally {
            // closes connection to database
            await connection.end();
        }
    } catch (err){
        console.error('Error connection to the database: ',err);
    }
};

const getManagers = async () => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        // Retrieving a list of managers from the 'employees' table
        try {
            const [rows] = await connection.query(`
            SELECT id, CONCAT(first_name, ' ', last_name) AS name
            FROM employees
            WHERE manager_id IS NULL
          `); 
          // Mapping the retrieved data to an array of objects with 'name' and 'value' properties
            return rows.map(row => ({ name: row.name, value: row.id }));
        } catch (err) {
            console.error('Error fetching managers: ', err); 
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
}


const getDepartments = async () => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig); 

        try {
            // Retrieving all departments from the 'departments' table
            const [rows] = await connection.query('SELECT * FROM departments');
            // Mapping the retrieved data to an array of objects with 'name' and 'value' properties
            return rows.map(row => ({ name: row.name, value: row.id })); 
        } catch (err) {
            console.error('Error fetching departments: ', err); 
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};

const createEmployee = async (employeeFirstName, employeeLastName, employeeRole, employeeManager) => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        try {
            // Inserting a new employee into the 'employees' table with the provided first name, last name, role ID, and manager ID
            await connection.query('INSERT INTO employees SET ?', {
                first_name: employeeFirstName,
                last_name: employeeLastName,
                role_id: employeeRole,
                manager_id: employeeManager,
            });
        } catch (err) {
            console.error('Error creating employee: ', err);
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};


const createRole = async (roleTitle, roleSalary, roleDepartment) => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig); 
        try {
            // Inserting a new role into the 'roles' table with the provided title, salary, and department ID
            await connection.query('INSERT INTO roles SET ?', {
                title: roleTitle,
                salary: roleSalary,
                department_id: roleDepartment
            });
        } catch (err) {
            console.error('Error creating role:', err);
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};


const createDepartment = async (departmentName) => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig);

        try {
            // Inserting a new department into the 'departments' table with the provided department name
            await connection.query('INSERT INTO departments SET ?', { name: departmentName });
        } catch (err) {
            console.error('Error creating department: ', err);
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};


const deleteObject = async (objectType, objectId) => {
    try {
        // Establishing a connection to the database using a connection pool
        const connection = await mysql.createPool(dbConfig).getConnection();
        try {
            // Starting a transaction
            await connection.beginTransaction();
            // Deleting an object from the specified table based on its ID
            await connection.query('DELETE FROM ?? WHERE id = ?', [objectType + 's', objectId]);
            // Committing the transaction, making the changes permanent
            await connection.commit();
        } catch (err) {
            // Handling an error that occurred while deleting the object
            console.error(`Error deleting ${objectType} with id ${objectId}:`, err); 
            // Rolling back the transaction to undo any changes made within the transaction
            await connection.rollback();
            // Rethrowing the error to propagate it to the caller
            throw err;
        } finally {
            // Releasing the connection back to the connection pool
            connection.release();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};

const updateEmployeeRole = async (employeeId, roleId) => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        try {
            // Updating the 'role_id' field of an employee in the 'employees' table with the provided employee ID and role ID
            await connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [roleId, employeeId]
            );
        } catch (err) {
            console.error('Error updating employee role: ', err);
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};


const updateEmployeeManager = async (employeeId, managerId) => {
    try {
        // Establishing a connection to the database
        const connection = await mysql.createConnection(dbConfig);
        try {
            // Updating the 'manager_id' field of an employee in the 'employees' table with the provided employee ID and manager ID
            await connection.query(
                'UPDATE employees SET manager_id = ? WHERE id = ?',
                [managerId, employeeId]
            );
        } catch (err) {
            console.error('Error updating employee manager: ', err);
        } finally {
            // Closing the database connection in the 'finally' block to ensure it always happens, even if an error occurred
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
};


module.exports = {
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
}