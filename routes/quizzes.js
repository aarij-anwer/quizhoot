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


router.get('/quiz/:quiz_id', (req, res) => {
  const quizId = req.params.quiz_id;
  db.getQuizQuestionsById(quizId)
    .then(data => {
      console.log('data', data);
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
/// view and attempt a single quiz\\\
// router.get('/quiz/:quiz_id', (req, res) => {
//   const quizId = req.params.quiz_id;
//   db.getQuizTitle(quizId)
//     .then(title => {
//       console.log('title test', title);
//       return title;
//     },
//   db.getQuizQuestionsById(quizId)
//     .then(data => {
//       // console.log('data', data);
//       // let quizTitle = db.getQuizTitle(quizId);

//       const templateVars = {
//         title: title,
//         quizzes: data
//       };
//       res.render('view-quiz', templateVars);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e);
//     })
// )});

//// Create a quiz \\\\
router.get('/new', (req, res) => {
  res.render('create-quiz');
});

router.post('/', (req, res) => {
  // Once login api added, owner_id needs to = userId
  // const userId = req.session.userId;
  db.createNewQuiz({...req.body, owner_id : 1})
    .then(quiz => {
      console.log('quiz', quiz);
      db.addQuestion({...req.body, quiz_id : quiz.id})
        .then(question => {
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
