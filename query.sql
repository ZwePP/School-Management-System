-- CREATE user
-- CREATE TABLE users(
--     user_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username TEXT NOT NULL,
--     password TEXT NOT NULL,
--     role TEXT NOT NULL
-- );

-- -- -- CREATE teacher table
-- CREATE TABLE teachers(
--     teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     teacher_name TEXT NOT NULL
-- );

-- -- -- CREATE class table
-- CREATE TABLE classes(
--     class_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     room_no TEXT NOT NULL,
--     class_name TEXT NOT NULL
-- );

-- --CREATE student table
-- CREATE TABLE students(
--     student_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     student_name TEXT NOT NULL,
--     date_of_birth DATE NOT NULL,
--     gender TEXT NOT NULL,
--     phone TEXT NOT NULL,
--     class_id INTEGER NOT NULL,
--     FOREIGN KEY (class_id) REFERENCES classes(class_id)
-- );

-- -- -- CREATE subject table
-- CREATE TABLE subjects (
--     subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     subject_name TEXT NOT NULL,
--     teacher_id INTEGER NOT NULL,
--     FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
-- );

-- -- -- -- CREATE attendance table
-- -- CREATE TABLE attendances(
-- --     attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
-- --     date DATE NOT NULL,
-- --     status TEXT NOT NULL,
-- --     student_id INTEGER NOT NULL,
-- --     FOREIGN KEY (student_id) REFERENCES students(student_id)
-- -- );

-- -- Create Transcript
-- CREATE TABLE transcripts(
--     transcript_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     score INTEGER NOT NULL,
--     subject_id INTEGER NOT NULL,
--     student_id INTEGER NOT NULL,

--     FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
--     FOREIGN KEY (student_id) REFERENCES students(student_id)
-- );




-- Users 
-- INSERT INTO users(username, password, role)
-- VALUES ('admin', '1234', 'admin');
-- user table data check
-- SELECT * FROM users;

-- Class test
-- INSERT INTO classes(room_no, class_name)
-- VALUES ('101', 'Grade 1A');
-- SELECT * FROM classes;

-- Teacher
-- INSERT INTO teachers (teacher_name)
-- VALUES ('John Smith');
-- SELECT * FROM teachers;


-- subject
-- INSERT INTO subjects(subject_name, teacher_id)
-- VALUES ('Mathematics', 1);
-- SELECT * FROM subjects;

-- student
-- INSERT INTO students(
--     student_name,
--     date_of_birth,
--     gender,
--     phone,
--     class_id
-- ) 
-- VALUES (
--     'John Doe',
--     '2000-01-01',
--     'Male',
--     '1234567890',
--     1
-- );
-- SELECT * FROM students;

-- ##Relation Test
-- SELECT s.student_name, c.class_name FROM students s
-- JOIN classes c ON s.class_id = c.class_id;

-- 
-- SELECT
--     subjects.subject_name,
--     teachers.teacher_name
-- FROM subjects 
-- JOIN teachers 
-- ON subjects.teacher_id = teachers.teacher_id;


-- ## ADD ATTENDANCE DATE 
-- INSERT INTO attendances(
--     date,
--     status,
--     student_id
-- )
-- VALUES(
--     '2026-06-15',
--     'Present',
--     1
-- );

-- ### QUERY ATTENDANCE WITH NAME
-- SELECT
--     A.date,
--     S.student_name,
--     A.status
-- FROM attendances AS A 
-- JOIN students AS S
-- ON A.student_id = S.student_id;


-- ### ADD Transcript data
-- INSERT INTO transcripts(
--     score,
--     subject_id,
--     student_id
-- )
-- VALUES
-- (
--     85,
--     1,
--     1
-- );
-- SELECT * FROM transcripts;




-- USEFUL QUERIES -- 

-- List all students with their class
-- SELECT 
--     S.student_name,
--     C.class_name
-- FROM students AS S
-- JOIN classes AS C ON S.class_id = C.class_id;

-- LIST STUDENT GRADES
-- SELECT 
--     stu.student_name,
--     sub.subject_name,
--     tr.score
-- FROM students AS stu
-- JOIN transcripts AS tr ON stu.student_id = tr.student_id
-- JOIN subjects AS sub ON tr.subject_id = sub.subject_id;


-- -- List Attendance
-- SELECT
--     st.student_name,
--     a.date,
--     a.status
-- FROM students AS st
-- JOIN attendances AS a ON st.student_id = a.student_id;


INSERT INTO users(username, password, role) VALUES (
    'teacher1', 'teacher123', 'teacher'
);