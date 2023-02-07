/* eslint-disable camelcase */
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

const getAllQuizzes = function() {
  return db.query(
    `SELECT id, title, description
    FROM quizzes
    WHERE public = true;`)
    .then((response) => {
      return response.rows;
    });
};

const getAllUserQuizzes = function(owner_id) {
  return db
    .query(
      `SELECT quizzes.id, title, description, public, users.name as username
      FROM quizzes JOIN users ON users.id = owner_id
      WHERE quizzes.owner_id = $1;
      `,[owner_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createNewQuiz, addQuestion, getAllQuizzes, getAllUserQuizzes };


