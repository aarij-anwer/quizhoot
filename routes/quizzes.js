/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/queries/database');
const router  = express.Router();


router.get('/home', (req, res) => {
  db.getAllQuizzes(10)
    .then(data => {
      console.log('data', data);
      console.log('data 0', data[0]);
      // const result = {};
      // for (let i = 0; i < data.length; i++) {
      //   result[i] = data[i];
      // }
      // // return result;
      // console.log('result', result);

      // for (const obj in result) {
      //   console.log('obj', result[obj]);
      //   // const templateVars = {
      //   //   obj
      //   // };
      //   // res.render('home-page', templateVars);
      // }
      // const arrToObject = arr => {
      //   const result = {};
      //   for (let i = 0; i < arr.length; i++) {
      //     // const key = arr[i]['id'];
      //     result[i] = arr[i];
      //   }
      //   return result;
      // };
      // const obj = arrToObject(data);
      const templateVars = {
        quizzes: data
      };
      console.log('templateVars', templateVars);
      // res.render('home-page', result);
      res.render('home-page', templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


//// Create a quiz
router.get('/new', (req, res) => {
  res.render('create-quiz');
});




router.post('/', (req, res) => {
  // Once login api added, owner_id needs to = userId
  // const userId = req.session.userId;
  db.createNewQuiz({...req.body, owner_id : 1})
    .then(quiz => {
      console.log(quiz);
      db.addQuestion({...req.body, quiz_id : quiz.id})
        .then(question => {

          res.redirect('/');
        })
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
