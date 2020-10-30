--------------------------------
-- DROP, CREATE, USE DATABASE --
--------------------------------
DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

-------------------
-- CREATE TABLES --
-------------------

-- CREATE DEPARTMENT TABLE --
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- CREATE ROLE TABLE --
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INTEGER(10)
);

-- CREATE EMPLOYEE TABLE --
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(10),
    manager_id INTEGER(10)
);

---------------------
-- INITIAL INSERTS --
---------------------

------------------------
-- DEPARTMENT INSERTS --
------------------------
INSERT INTO department (name)
VALUES 
("Management"),
("Production"),
("Marketing"),
("Sales"),
("Tech Support");

------------------
-- ROLE INSERTS --
------------------
INSERT INTO role (title, salary, department_id)
VALUES 
-- Manager Roles --
("CEO", 5000000.00, 1), -- 1
("Production Director", 80000.00, 2), -- 2
("Marketing Director", 80000.00, 3), -- 3
("Sales Director", 80000.00, 4), -- 4
("IT Director", 80000.00, 5), -- 5

-- Production Roles --
("Illustrator", 60000.00, 2), -- 6
("Animator", 60000.00, 2), -- 7
("Writer", 60000.00, 2), -- 8

-- Marketing Roles --
("Marketing Specialist", 60000.00, 3), -- 9

-- Sales Roles --
("Sales Specialist", 60000.00, 4), --10

-- Tech Support Roles
("Programming Specialist", 60000.00, 5); --11

----------------------
-- EMPLOYEE INSERTS --
----------------------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
-- Manager Employees
("Brice", "Karsh", 1, 1), -- 1
("Tim","Carrilo", 2, 1), -- 2
("Micah", "Kohne", 3, 1), -- 3
("Scott","Slack", 4, 1), -- 4
("Dean","Manelis" 5, 1), -- 5

-- Production Employees
("Nick","Lang",6,3), -- 6
("Jeremiah","Flyer",7,3), -- 7
("Charlette","Solder",8,3), -- 8

-- Marketing Employees
("Andy", "Greenhaw", 9, 3), -- 9

-- Sales Employees
("Tyler","Korn", 10, 4), -- 10

-- Tech Support Employees
("Kevin","Keables", 11, 5); -- 11

----------------
-- JOIN ITEMS --
----------------
SELECT * FROM role;
SELECT * FROM employee;

-- show ALL books with authors
-- INNER JOIN will only return all matching values from both tables
SELECT first_name, last_name, role_id
FROM role
LEFT JOIN employee ON role.id = employee.role_id;

---------------------
--SELECTOR EXAMPLE --
---------------------
-- SELECT top5000.customer AS person, isActive, top5000.position, top5000.year (AS renames customer)
-- FROM top5000
-- WHERE year > 1965
-- ORDER BY year DESC -- (Default is ASC - asscending)

-- SELECT artist FROM top5000 GROUP BY artist -- (Groups mult listings into one)

-- SELECT name FROM top5000 WHERE signupDate > "2020-09-10";

-- UPDATE top5000
-- SET artist = "Prince"
-- WHERE color = "purple"


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
