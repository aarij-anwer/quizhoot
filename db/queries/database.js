const db = require('../connection');

const createNewQuiz = function(quiz) {
  console.log(quiz);
  return db
    .query(`INSERT INTO quizzes(owner_id, title, description, public, total_questions) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [quiz.owner_id, quiz.title, quiz.description,quiz.public, 3])
    .then(data => {
      return data.rows[0];
    });
};

const addQuestion = function(question) {
  console.log(question);
  return db

    .query(`INSERT INTO questions(quiz_id, question_text, option_1, option_2, option_3, correct_answer) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [question.quiz_id, question.question_text, question.option_1, question.option_2, question.option_3, question.correct_answer])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { createNewQuiz, addQuestion };



