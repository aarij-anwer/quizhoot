/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/connection');
const router  = express.Router();


router.get('/new', (req, res) => {
  res.render('create-quiz');
});



router.post('/new', (req, res) => {
  // Once login api added, owner_id needs to = userId
  // const userId = req.session.userId;
  console.log(req.body);
  db.createNewQuiz({...req.body, owner_id : 1})

    .then(quiz => {
      res.send(quiz);
      res.redirect('/');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

  return router;

});





module.exports = router;
