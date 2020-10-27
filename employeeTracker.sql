-- DROP, CREATE, USE DATABASE --
DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

-- Create Department Table --
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
);

-- Create Role Table --
CREATE TABLE role (
    id id INT AUTO_INCREMENT PRIMARY KEY,,
    title VARCHAR(30),
    salary DECIMAL(10),
    department_id INTEGER(10)
);

-- Create Employee Table --
CREATE TABLE employee (
    id id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(10),
    manager_id INTEGER(10)
);

-- INSERT INTO auction (item, notes, price)
-- VALUES ("table", "pine table belonging to Abe Lincoln", 10.00);
-- INSERT INTO auction (item, notes, price)
-- VALUES ("chair", "white plastic chair", 5.00);
-- INSERT INTO auction (item, notes, price)
-- VALUES ("lawn service", "will cut your your grass once a week for 25.00", 25.00)




-- Insert Variables
-- INSERT INTO something(something,something,somethign) 
-- VALUES
-- (something,something,something)
-- (something,something,something)
-- (something,something,something); -- Only Need ; on Last Row

-- INSERT INTO auction (item, notes, price)
-- VALUES ("table", "pine table belonging to Abe Lincoln", 10.00);
-- INSERT INTO auction (item, notes, price)
-- VALUES ("chair", "white plastic chair", 5.00);
-- INSERT INTO auction (item, notes, price)
-- VALUES ("lawn service", "will cut your your grass once a week for 25.00", 25.00);

-- Query Setup
-- Collecting All the Data Being Requested and Displays It (Almost Like an Array)
-- Example from Books Tuesday Morning
-- SELECT
-- books.id,
-- books.title,
-- authors.name as author,
-- authors.bio
-- hometown.name AS hometown,
-- subjects.topic AS subjects
-- FROM books
-- LEFT JOIN authors ON books.authorID = authorID 
-- LEFT JOIN hometowns on authors.hometownId = hometownId
-- LEFT JOIN subjects on books.subjectId = subjects.id
