DROP DATABASE IF EXISTS employment_db;
CREATE DATABASE employment_db;
USE employment_db;

-- Create a "departments" table to store department information
CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

-- Create a "roles" table to store job roles
CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2), -- Added precision and scale to the DECIMAL data type
    department_id INT
);

-- Create an "employees" table to store employee information
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
