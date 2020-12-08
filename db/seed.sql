INSERT INTO employee(first_name, last_name, role_id) 
VALUES
('Bob', 'Bobertson', 1),
('Rob', 'Robertson', 2),
('Rosan', 'Rosanadana', 3),
('Steve (developers developers developers)', 'Ballmer', 4),
('Moni', 'Baggs', 5),
('Bea', 'Goode', 6);

INSERT INTO department(department_name)
VALUES 
('Marketing'),
('Accounting'),
('Sales'),
('Human Resources'),
('Technology');

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Rep', 32000, 3),
('Overpaid Over-promising Salesperson', 172000, 3),
('Overworked Marketing Teammate', 25000, 1),
('Rad computer D00D', 69000, 5),
('Accountant', 55000, 2),
('Hiring Manager', 45000, 4)
;

UPDATE `employeeDB`.`employee` SET `manager_id` = '1' WHERE (`id` >= '1');