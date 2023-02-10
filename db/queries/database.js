/* eslint-disable camelcase */
const db = require('../connection');

const createNewQuiz = function(quiz) {
  return db
    .query(`INSERT INTO quizzes(owner_id, title, description, public, total_questions) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [quiz.owner_id, quiz.title, quiz.description,quiz.public, 3])
    .then(data => {
      return data.rows[0];
    });
};

const addQuestion = function(question) {
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

const getQuizQuestionsById = function(id) {
  return db.query(
    `SELECT quizzes.id AS quizID, quizzes.title, quizzes.description, questions.*
    FROM quizzes
    JOIN questions ON quizzes.id = quiz_id
    WHERE quizzes.id = $1
    GROUP BY quizzes.id, questions.id;`, [id])
    .then((response) => {
      return response.rows;
    });
};
const getQuizTitle = function(id) {
  return db.query(
    `SELECT title
    FROM quizzes
    WHERE id = $1;`, [id])
    .then((response) => {
      let obj = response.rows[0];
      let title = '';
      for (const key in obj) {
        title = obj[key];
      }
      return title;
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

const getUserTotalQuizzes = function(owner_id) {
  return db
    .query(
      `SELECT count(quizzes.*) as total_quizzes
      FROM quizzes JOIN users ON users.id = owner_id
      WHERE quizzes.owner_id = $1;
      `,[owner_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserAttempts = function(owner_id) {
  return db
    .query(
      `SELECT count(quiz_attempts.*) as total_attempts, avg(ROUND(total_score)) as avg_score
      FROM quiz_attempts JOIN users ON users.id = user_id
      WHERE quiz_attempts.user_id = $1;
      `,[owner_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getQuizResults = function(id) {
  return db.query(
    `SELECT quizzes.id AS quiz_id, quizzes.title, quizzes.description, quizzes.total_questions, quiz_attempts.id as attempt_id, quiz_attempts.total_score
    FROM quizzes
    JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
    WHERE quiz_attempts.id = $1
    GROUP BY quizzes.id, quiz_attempts.id;`, [id])
    .then((response) => {
      return response.rows;
    });
};

const createQuizAttempt = function(attempt) {
  let filteredAnswers = attempt.answers.filter(x => x === 'true');
  const date = new Date();
  const startedAt = date.toUTCString();
  return db
    .query(`INSERT INTO quiz_attempts(quiz_id, user_id, started_at, finished_at, total_score) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [attempt.quiz_id, attempt.user_id, startedAt, startedAt, filteredAnswers.length])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = {
  createNewQuiz,
  addQuestion,
  getAllQuizzes,
  getQuizQuestionsById,
  getQuizTitle,
  getAllUserQuizzes,
  getUserTotalQuizzes,
  getUserAttempts,
  createQuizAttempt,
  getQuizResults
};


