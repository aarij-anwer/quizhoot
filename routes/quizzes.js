/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/queries/database');
const { getUser } = require('../db/queries/users');
const router  = express.Router();


/// view all quizzes
router.get('/home', (req, res) => {
  db.getAllQuizzes(10)
    .then(data => {
      const templateVars = {
        quizzes: data,
        userID: req.cookies.user_id
      };
      res.render('home-page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

// view my quizzes
router.get('/user/:id', (req, res) => {
  const userId = req.cookies.user_id;
  const name = req.cookies.name;

  db.getAllUserQuizzes(userId)
    .then(data => {
      const templateVars = {
        quizzes: data,
        userID: userId,
        name
      };
      console.log(templateVars);
      res.render('user-profile', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


// Create a quiz
router.get('/new', (req, res) => {
  const userID = req.cookies.user_id;
  const templateVars = {
    userID
  };

  res.render('create-quiz', templateVars);
});

router.post('/', (req, res) => {
  // Once login api added, owner_id needs to = userId
  const userId = req.cookies.user_id;
  db.createNewQuiz({...req.body, owner_id : userId})
    .then(quiz => {
      console.log(quiz);
      db.addQuestion({...req.body, quiz_id : quiz.id})
        .then(question => {
          console.log(question);
        })
        .catch(e => {
          console.error(e);
          res.send(e);
        });

      let quizID = quiz.id;
      res.redirect(`/quizzes/quiz/${quizID}`);

    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

  return router;

});


module.exports = router;
