INSERT INTO department (department_name) 
VALUES ('Clothing'),
       ('Auto'),
       ('Fishing'),
       ('Sports');

INSERT INTO roles (job_title, salary, department_id) 
VALUES ('cashier', 30000, 1),
       ('stocker', 32000, 2),
       ('manager', 50000, 3),
       ('sales', 40000, 4);

INSERT INTO employees (first_name, last_name, dept_id, job_title, salary, manager_name)
VALUES ('david', 'herring', 1, 'cashier', 30000, 'bob' ),
       ('brooke', 'herring', 2, 'stocker', 32000, 'jeff' ),
       ('jeff', 'taylor', 3, 'manager', 50000, 'bill' ),
       ('april', 'fredrick', 4, 'sales', 40000, 'jeff' )

