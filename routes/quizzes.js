/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/queries/database');
const router  = express.Router();

/// view all quizzes \\\
router.get('/home', (req, res) => {
  db.getAllQuizzes(10)
    .then(data => {
      const templateVars = {
        quizzes: data
      };
      res.render('home-page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

/// view and attempt a single quiz \\\
router.get('/quiz/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  db.getQuizQuestionsById(quizId)
    .then(data => {
      const templateVars = {
        quizzes: data
      };
      res.render('view-quiz', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/quiz_attempts', (req, res) => {
  const userId = req.cookies.user_id;
  const quizId = req.query.quiz_id;
  const answers = Object.values(req.body);

  db.createQuizAttempt({answers, user_id : userId, quiz_id : quizId})
    .then(data => {
      let attemptID = data.id;
      //redirect or render to results page (update once added)
      res.redirect(`/quizzes/results/${attemptID}`);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  return router;
});

/// view my quizzes \\\
router.get('/user/:id', (req, res) => {
  const userId = req.cookies.user_id;
  const templateVars = {
    userID: userId
  };
  db.getAllUserQuizzes(userId)
    .then(data => {

      templateVars ["quizzes"] = data;
      return db.getUserTotalQuizzes(userId);
    })
    .then(data1 => {
      templateVars ["total_quizzes"] = data1;
      return db.getUserAttempts(userId);
    })
    .then(data2 => {
      templateVars ["attempts"] = data2;
      res.render('user-profile', templateVars);
    });
});

//// Create a quiz \\\\
router.get('/new', (req, res) => {
  res.render('create-quiz');
});

router.post('/', (req, res) => {
  // Once login api added, owner_id needs to = userId
  const userId = req.cookies.user_id;
  db.createNewQuiz({...req.body, owner_id : userId})
    .then(quiz => {
      const promises = [];
      //creates the questions array
      for (let question of req.body.questions) {
        const promise = db.addQuestion({...question, quiz_id : quiz.id});
        promises.push(promise);
      }
      //collects all the question promises and returns the questions array to be funneled into the single page view
      return Promise.all(promises);
    })
    .then((questions => {
      let quizID = questions[0].quiz_id;
      res.redirect(`/quizzes/quiz/${quizID}`);
    }))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  return router;

});

/// view and attempt a single quiz\\\
router.get('/results/:attempt_id', (req, res) => {
  const attemptID = req.params.attempt_id;
  const userID = req.cookies.user_id;
  const name = req.cookies.name;


  db.getQuizResults(attemptID)
    .then(quizzes => {
      const templateVars = {
        quizzes,
        userID,
        name
      };
      console.log(templateVars);
      res.render('results', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });


});

module.exports = router;
