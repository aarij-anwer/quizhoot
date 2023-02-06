const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//returns an empty array if no user exists with email, otherwise returns the user from the users table
const getUser = function(email) {
  return db
    .query('SELECT * FROM users WHERE email = $1',[email])
    .then(data => {
      return data.rows[0];
    });
};

//takes a user object { name, email, password } and adds it to the users table
const addUser = function(user) {
  return db
    .query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *',[user.name, user.email, user.password])
    .then(data => {
      return data.rows[0];
    });
};
module.exports = { getUsers, getUser, addUser };
