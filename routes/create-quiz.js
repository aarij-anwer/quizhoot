/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/queries/database');
const router  = express.Router();


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
