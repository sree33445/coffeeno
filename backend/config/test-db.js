const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('PostgreSQL Connected:', res.rows[0]);
    process.exit();
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
})();
