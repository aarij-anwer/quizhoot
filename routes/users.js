/* eslint-disable camelcase */
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/queries/users');

router.get('/', (req, res) => {
  res.redirect('/quizzes/home');
});

//user registration routes
router.get('/new', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = {
    name,
    email,
    password
  };

  if ((!name) || (!email) || (!password)) {
    //no name and/or email and/or password provided
    return res.status(400).send(`<p>Please enter a name, email and password!</p><button onclick="history.back()">Go Back</button>`);
  }

  // db.getUser(email)
  //   .then(user => {
  //     if (user) {
  //       return res.status(400).send(`<p>User exists!</p><button onclick="history.back()">Go Back</button>`);
  //     }
  //   })
  //   .catch(e => res.send(e));


  db.addUser(newUser)
    .then(addedUser => {
      if (!addedUser) {
        return res.status(400).send(`<p>Something went wrong with the DB`);
      }
      console.log(addedUser);
      res.cookie('user_id', addedUser.id);
      res.redirect('/quizzes/home');
    })
    .catch(e => res.send(e));
});



module.exports = router;
