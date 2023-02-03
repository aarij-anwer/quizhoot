const express = require('express');
const router  = express.Router();

router.get('/new', (req, res) => {
  res.render('create-quiz');
  console.log("hello new quiz");
});




router.post('/quizzes', (req, res) => {
  res.render('quizzes');
});





module.exports = router;
