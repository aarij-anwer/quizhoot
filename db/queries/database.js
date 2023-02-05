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

const getAllQuizzes = function(limit) {
  return db.query(
    `SELECT *
    FROM quizzes
    LIMIT $1;`, [limit])
    .then((response) => {
      return response.rows;
    });
};

module.exports = { createNewQuiz, addQuestion, getAllQuizzes };
// CREATE TABLE quizzes (
//   id SERIAL PRIMARY KEY NOT NULL,
//   owner_id INTEGER REFERENCES users(id),
//   title VARCHAR(255) NOT NULL,
//   description TEXT NOT NULL,
//   public BOOLEAN NOT NULL,
//   Total_questions INTEGER
// );
// CREATE TABLE questions (
//   id SERIAL PRIMARY KEY NOT NULL,
//   quiz_id INTEGER REFERENCES quizzes(id),
//   question_text VARCHAR(255) NOT NULL,
//   option_1 VARCHAR(255) NOT NULL,
//   option_2 VARCHAR(255) NOT NULL,
//   option_3 VARCHAR(255) NOT NULL,
//   correct_answer VARCHAR(255) NOT NULL
// );


