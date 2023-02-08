/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/queries/database');
const { getUser } = require('../db/queries/users');
const router  = express.Router();


/// view all quizzes \\\
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

/// view and attempt a single quiz\\\
router.get('/quiz/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  const userId = req.cookies.user_id;
  const name = req.cookies.name;
  db.getQuizQuestionsById(quizId)
    .then(data => {
      // console.log('data', data);
      const templateVars = {
        quizzes: data,
        userID: userId,
        name
      };
      res.render('view-quiz', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


/// view my quizzes \\\
router.get('/user/:id', (req, res) => {
  const userId = req.cookies.user_id;
  const name = req.cookies.name;
  const templateVars = {
    userID: userId,
    name
  };
  db.getAllUserQuizzes(userId)
    .then(data => {
      templateVars ["quizzes"] = data;
      db.getUserTotalQuizzes(userId)
        .then(data1 => {
          console.log("test1", data1);
          templateVars ["total_quizzes"] = data1;
          db.getUserAttempts(userId)
            .then(data2 => {
              console.log("test3", data2);
              templateVars ["attempts"] = data2;
              res.render('user-profile', templateVars);
            });
        });
    });
});

//// Create a quiz \\\\
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
      console.log('quiz', quiz);
      const promises = [];
      //creates the questions array
      for (let question of req.body.questions) {
        const promise = db.addQuestion({...question, quiz_id : quiz.id});
        promises.push(promise);
      }
      //collects all the question promises and returns the questions array to be funneled into the single page view
      Promise.all(promises)
        .then((questions => {
          console.log('questions', questions);
          let quizID = quiz.id;
          res.redirect(`/quizzes/quiz/${quizID}`);
        }))
        .catch(e => {
          console.error(e);
          res.send(e);
        });
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

  return router;

});


module.exports = router;
