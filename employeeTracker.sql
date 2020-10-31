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
("Sales Specialist", 60000.00, 4), -- 10

-- Tech Support Roles
("IT Specialist", 60000.00, 5); -- 11

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
("Dean","Manelis", 5, 1), -- 5

-- Production Employees
    -- Illustrators
("Nick","Lang",6,2), -- 6
("Ruth","Rose",6,2), -- 7
("Brian","Evans",6,2), -- 8

    -- Animators
("Christina","Sidorowych",7,2), -- 9
("Jeremiah","Flyer",7,2), -- 10
("Kaj","Bishop",7,2), -- 11

    -- Writers
("Charlette","Solder",8,2), -- 12
("Jaylene","Carrilo",8,2), -- 13
("Melissa","Zachritz",8,2), -- 14

-- Marketing Employees
("Andy", "Greenhaw",9,3), -- 15

-- Sales Employees
("Tyler","Komarnycky",10,4), -- 16
("Darlene","McLoughlin",10,4), -- 17
("Brianna","Jevnager",10,4), -- 18

-- Tech Support Employees
("Kevin","Keables", 11,5); -- 19

