INSERT INTO department (department_name) 
VALUES ('Clothing_dept'),
       ('Auto_dept'),
       ('Fishing_dept'),
       ('Sport_dept'),
       ('Golf_dept'),
       ('Baseball_dept'),
       ('Bike_dept'),
       ('Shoe_dept'),
       ('Exercise_dept');

INSERT INTO roles (job_title, salary, department_id) 
VALUES ('Cashier', 30000, 1),
       ('Stocker', 32000, 2),
       ('Manager', 70000, 3),
       ('Sales', 40000, 4);



INSERT INTO employees (first_name, last_name, dept_id, job_title, salary, manager_name)
VALUES ('David', 'Herring', 1, 'Cashier', 30000, 'Bob' ),
       ('Brooke', 'Ashley', 2, 'Stocker', 32000, 'Jeff' ),
       ('Jeff', 'Taylor', 3, 'Manager', 50000, 'Bill' ),
       ('April', 'Fredrick', 4, 'Sales', 40000, 'Jeff' );
