-- Sample INSERT Statements for School Management System
USE school_management;

-- Inserting data into Teachers
INSERT INTO Teachers (first_name, last_name, subject) VALUES
('John', 'Smith', 'Mathematics'),
('Emily', 'Davis', 'Science'),
('Michael', 'Wilson', 'English');

-- Inserting data into Classes
INSERT INTO Classes (class_name, teacher_id) VALUES
('Mathematics Class A', 1),
('Science Class B', 2),
('English Class C', 3);

-- Inserting data into Students
INSERT INTO Students (first_name, last_name, age, class_id) VALUES
('Alice', 'Johnson', 15, 1),
('James', 'Brown', 16, 1),
('Emma', 'Williams', 14, 2),
('Oliver', 'Davis', 15, 3);

-- Inserting data into Subjects
INSERT INTO Subjects (subject_name, teacher_id, class_id) VALUES
('Algebra', 1, 1),
('Biology', 2, 2),
('Literature', 3, 3);
