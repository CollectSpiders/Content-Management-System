DROP DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Creates the employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
);

-- Creates a table for roles
CREATE TABLE IF NOT EXISTS roles (
    id IN AUTO_INCREMENT PRIMARY KEY,
);

-- Creates a table for departments
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
);
