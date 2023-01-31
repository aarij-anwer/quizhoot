# Functional Requirements:

- users can create quizzes
- users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
- users can share a link to a single quiz
- users can see a list of public quizzes
- users can see a list of public quizzes on the home page
- users can attempt a quiz
- users can see the results of their recent attempt
- users can share a link to the result of their attempt

## Questions to answer:
- Do we want to set up a feature to edit the survey?
- Set up a profile page that has a chart with their recent attempts and quizes they own?
- Should users be able to take a quiz multiple times? If so, should we show the correct results or just show their attempt?
- Should we set a min/max for how many questions they can ask?

### users can create quizzes
- User must be logged in to create a quiz, and if they are not registered they must create an account. 
- User can put whatever they want for questions and answers
- min/max for how many questions they can have. 

### users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
- users must be logged in to change the status of visibility, and if they are not the owner, it alerts that they cannot change it. 


### users can share a link to a single quiz
- have to be logged in to view and take the quiz
- if the user does not have an account it prompts them to register for one. 
- Once logged in the user can view the quiz and attempt it. 

### users can see a list of public quizzes
- don't have to be logged in to view the overall list, but to go into one they need to be logged in.

### users can see a list of public quizzes on the home page
- when users are not logged in they see the public quizzes but can not accces the single quizzes
- when users are logged in, they see the home page with the public quizzes and can open them if they click on a specific quiz and it opens to a single quiz page. 

### users can attempt a quiz
- user needs to be logged in to take a quiz
- if they are not logged in user will be prompted to login 
- can navigate to a public quiz (or private if they own it) and view/attempt the quiz 

### users can see the results of their recent attempt
- users don't need to be logged in to view the results page
- users can see the quiz attempt, who attempted it, the correct answers, and their score. 

### users can share a link to the result of their attempt
- users don't have to be logged in to view the results page. 
- user can view, but cannot take the quiz without logging in. 


