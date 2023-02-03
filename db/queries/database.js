const db = require('../connection');

const createNewQuiz = function(quiz) {
  return db
    .query(`INSERT INTO quizzes(owner_id, title, description, public) VALUES($1, $2, $3, $4) RETURNING *`,
      [quiz.owner_id, quiz.title, quiz.description,quiz.public])
    .then(data => {
      return data.rows;
    });

};

module.exports = { createNewQuiz };
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


