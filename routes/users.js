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

//logout route
router.get('/logout', (req, res) => {
  res.clearCookie("user_id");
  res.clearCookie("name");
  res.redirect('/quizzes/home');
});

//login routes
router.get('/login', (req, res) => {
  const userID = req.cookies.user_id;
  const name = req.cookies.name;

  const templateVars = {
    userID,
    name
  };

  if (userID) {
    //user logged in
    res.redirect('/quizzes/home');
  } else {
    res.render('login', templateVars);
  }
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if ((!email) || (!password)) {
    //no name and/or email and/or password provided
    return res.status(400).send(`<p>Please enter an email and password!</p><button onclick="history.back()">Go Back</button>`);
  }

  db.getUser(email)
    .then(user => {
      console.log("returned user", user);
      if (user) {
        res.cookie('user_id', user.id);
        res.cookie('name', user.name);
        res.redirect('/quizzes/home');
      } else {
        console.log("user doesn't exist");
        // res.redirect('/users/login');
        return res.status(400).send(`<p>User does not exist!</p><button onclick="history.back()">Go Back</button>`);
      }
    })
    .catch(e => res.send(e));

  //haven't checked password
});

//user registration routes
router.get('/new', (req, res) => {
  const userID = req.cookies.user_id;
  const name = req.cookies.name;

  const templateVars = {
    userID,
    name
  };

  if (userID) {
    //user logged in
    res.redirect('/quizzes/home');
  } else {
    res.render('register', templateVars);
  }
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

  db.getUser(email)
    .then(user => {
      if (user) {
        console.log("the user exists");
        return res.status(400).send(`<p>User exists!</p><button onclick="history.back()">Go Back</button>`);
      } else {
        console.log("the user doesn't exist, adding to the DB");
        db.addUser(newUser)
          .then(addedUser => {
            if (!addedUser) {
              return res.status(400).send(`<p>Something went wrong with the DB`);
            }
            console.log(addedUser);
            res.cookie('name', addedUser.name);
            res.cookie('user_id', addedUser.id);
            res.redirect('/quizzes/home');
          })
          .catch(e => res.send(e));
      }
    })
    .catch(e => res.send(e));

});



module.exports = router;
