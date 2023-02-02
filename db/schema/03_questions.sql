DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  question_text VARCHAR(255) NOT NULL,
  option_1 VARCHAR(255) NOT NULL,
  option_2 VARCHAR(255) NOT NULL,
  option_3 VARCHAR(255) NOT NULL,
  correct_answer BOOLEAN NOT NULL
);
