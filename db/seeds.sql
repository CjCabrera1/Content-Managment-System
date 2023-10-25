INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Engineering'),
  ('HR');


INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 75000.00, 1),
  ('Sales Representative', 45000.00, 1),
  ('Marketing Manager', 70000.00, 2),
  ('Financial Analyst', 60000.00, 3),
  ('Software Engineer', 80000.00, 4),
  ('HR Manager', 65000.00, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL), -- Sales Manager
  ('Jane', 'Smith', 2, 1),   -- Sales Representative (Reports to John Doe)
  ('Michael', 'Johnson', 3, NULL),  -- Marketing Manager
  ('Emily', 'Brown', 4, NULL),   -- Financial Analyst
  ('David', 'Wilson', 5, NULL),   -- Software Engineer
  ('Laura', 'Miller', 6, NULL);  -- HR Manager