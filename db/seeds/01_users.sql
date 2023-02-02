INSERT INTO users (name, email, password)
VALUES ('Aarij Anwer', 'aarij.anwer@gmail.com', 'password'),
('Atiqa Ahmed', 'atiqa426@gmail.com', 'password'),
('Nadira Moyez', 'nadiramoyez@gmail.com', 'password');

INSERT INTO quizzes (owner_id, title, description, privacy, total_questions)
VALUES (1, 'My first quiz', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', TRUE, 10),
(2, 'My first quiz', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', TRUE, 10),
(1, 'My private quiz', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', FALES, 5);

