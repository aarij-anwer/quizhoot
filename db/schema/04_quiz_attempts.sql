DROP TABLE IF EXISTS quiz_attempts CASCADE;

CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  user_id INTEGER REFERENCES users(id),
  started_at TIMESTAMP NOT NULL,
  finished_at TIMESTAMP NOT NULL,
  total_score INTEGER NOT NULL
);
