## Functional Requirements:

- users can create quizzes
- users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
- users can share a link to a single quiz
- users can see a list of public quizzes
- users can see a list of public quizzes on the home page
- users can attempt a quiz
- users can see the results of their recent attempt
- users can share a link to the result of their attempt


### users can create quizzes
- Front end structure: 
  - HTML FORM: questions, answers, public (or not), submit
- Back end structure:
  - checks if user is logged in and if not, prompts you to login. 
  - Stored in database table(s): quiz, questions(?), answers, users, public
  - Function to take in questions and store them using a query (repeat for all inserts into tables)
  - Function to loop through inputs and insert into html to show the completed quiz

### users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
- Front end structure:
  - If you are the owner and logged in, it shows a prompt to change the visibility on the single quiz page or on the profile.
- Back end structure: 
  - checks if user is logged in and if not, prompts you to login. 
  - if user does not own the quiz they cannot change the visibility and sends an alert. 
  - coloumn on the quiz table that if not null then show the quiz on the home page. 
  - Function to set the visibility status (if set to public, update column with 'public' else set to null)

### users can share a link to a single quiz
- Front end structure: 
  - if they are logged in, shows the html page with the quiz
  - if they are not logged in, shows a prompt to login or create an account. 
  - should we have a button that can copy the link to the clipboard on the quiz page?
- Back end structure:
  - when visited checks if the user is logged in and if not alerts they need to be to view
  - if they are logged in, shows the quiz and allows quiz attempt. 

### users can see a list of public quizzes
- Front end structure:
  - shows a html page with a list of the public quizzes
- Backend Structure:
  - shows all quizzes with a public key
  - (above takes care of viewing a single page when not logged in)

### users can see a list of public quizzes on the home page
- Front end structure: 
  - logged in: a page showing all the quizzes with public keys and a prompt to create a new quiz. 
  - not logged in: (see above)
- Back end structure:
  - checks if user is logged in and if not, prompts you to login. 
  - show all quizes with a public key (logged in or not)
  - if logged in: show all quizzes and show an html prompt to create a new quiz. 

### users can attempt a quiz
- Front end Structure:
  - HTML page of the quiz with the questions and spaces for the answers
- Back end structure:
  - checks if user is logged in and if not, prompts you to login. 
  - store quiz attempt in quiz_attempts table
  - compare answer input to correct answers
  - tally score out of so many questions, and show it on the results page. 

### users can see the results of their recent attempt
- Front end structure:
  - Show who attempted the quiz 
  - Show your quiz attempt and the correct results 
  - Show the tallied score
- Back end structure:
  - show the user.name from the users table 
  - show the quiz attempt from the quiz_attempts table and the correct answers/results 
  - This page is viewable by anyone 

### users can share a link to the result of their attempt 
- Front end structure: 
  - will be the same page as above
  - option to share your results on the page (button or emoji)
- Back end structure:
  - will have the same structure as above as same page.
  - if user clicks share result it copies to the clipboard and alerts or opens the share options (if that is feasible design for us)

