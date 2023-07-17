DROP DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Creates the employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name,
    role_id,
    manager_id,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE,
    SET NULL
);

-- Creates a table for roles
CREATE TABLE IF NOT EXISTS roles (
    id IN AUTO_INCREMENT PRIMARY KEY,
);

-- Creates a table for departments
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
);
