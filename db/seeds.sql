-- Inserts employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('john', 'doe', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('jane','doe',2,null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('kyle','king',3,null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('kayla','kules',4,null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('scott','sephs',5,null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('adrian','lee',6,null);

-- inserts roles
INSERT INTO roles (title, salary, department_id)
VALUES ('general',30140,1);
INSERT INTO roles (title, salary, department_id)
VALUES ('manager',46992,2);
INSERT INTO roles (title, salary, department_id)
VALUES ('engineer',110000,3);
INSERT INTO roles (title, salary, department_id)
VALUES ('system admin',94000,4);
INSERT INTO roles (title, salary, department_id)
VALUES ('operations director',194000,5);

-- inserts departments

INSERT INTO departments (name)
VALUES ('on-floor')
INSERT INTO departments (name)
VALUES ('IT')
INSERT INTO departments (name)
VALUES ('corperate')