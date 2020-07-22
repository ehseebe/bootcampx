const { Pool } = require('pg');

const pool = new Pool ({
  users: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});



//makes a query to our student table, returns (array of) JS objects
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));







