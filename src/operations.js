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