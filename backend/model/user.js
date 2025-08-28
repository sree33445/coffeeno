const pool = require('../config/db');

exports.createUser = async ({ firstName, lastName, email, phone, password, birthday, subscribeToOffers }) => {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, phone, password, birthday, subscribe_to_offers)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, first_name, last_name, email, phone, birthday, subscribe_to_offers`,
    [firstName, lastName, email, phone, password, birthday || null, subscribeToOffers]
  );
  return result.rows[0];
};

exports.getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};
