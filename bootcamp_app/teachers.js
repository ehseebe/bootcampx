const { Pool } = require('pg');

const pool = new Pool ({
  users: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});



//makes a query to our student table, returns (array of) JS objects
pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
GROUP BY teachers.name, cohorts.name
;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));
