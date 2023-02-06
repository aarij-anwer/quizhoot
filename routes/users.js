/* eslint-disable camelcase */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  console.log("Post request");
  res.redirect('/quizzes/home');
});

//user registration
router.get('/new', (req, res) => {
  console.log("User registration");
  res.render('register');
});

module.exports = router;
