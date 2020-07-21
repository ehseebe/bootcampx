SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests.teacher_id) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;


SELECT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests.teacher_id) as total_assistances
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = 'JUL02'
GROUP BY teachers.name, cohorts.name
ORDER BY total_assistances DESC
;