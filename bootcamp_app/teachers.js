const { Pool } = require('pg');

const pool = new Pool ({
  users: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT teachers.name as teacher, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
;
`;

const cohortName = process.argv[2] || 'JUL02';

// Store all potentially malicious values in an array. 
const values = [`${cohortName}`];

//makes a query to our student table, returns (array of) JS objects
pool.query(queryString, values, (err, res) => {
  console.log(err, res.rows)
  pool.end()
});
