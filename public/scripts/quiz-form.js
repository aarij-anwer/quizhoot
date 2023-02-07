/* eslint-disable camelcase */
$(() => {

  const $step1 = $('.step_1');
  const $step2 = $('.step_2');

  $('#btn-add-questions').on('click', () => {
    $step1.css("display", "none");
    $step2.css("display", "flex");
    addQuestion();
    updateQuestionNum();
  });

  $('#btn-back').on('click', () => {
    $step2.css("display", "none");
    $step1.css("display", "flex");
  });

  let questionIndex = 1;

  const updateQuestionNum = function() {
    $('.question .question-header .form-label').each(function(index) {
      console.log('element', this);
      $(this).text(`Question ${index + 1}`);
    });
  };

  const addQuestion = function() {
    let $question = `
    <div class="question">
    <hr class="hr">
    <br><br>
    <div class="question-header">
      <label class="form-label">Question</label>
      <button class="secondary-button btn-remove-question"
              type="button">Remove</button>
    </div>
    <br><br>
    <input class="input-text"
           type="text"
           id="question"
           name="questions[${questionIndex}][question_text]"
           placeholder="Enter a question">
    <br><br>
    <label class="form-label">First answer</label>
    <input class="input-text"
           type="text"
           name="questions[${questionIndex}][option_1]"
           placeholder="Enter an answer choice">
    <div class="radio-answer">
      <input type="checkbox"
             id="radio_1"
             name="questions[${questionIndex}][correct_answer]"
             value="1"
             checked="checked">
      <label for="radio_1">Correct answer</label>
    </div>
    <br><br>
    <label class="form-label">Second answer</label>
    <input class="input-text"
           type="text"
           name="questions[${questionIndex}][option_2]"
           placeholder="Enter an answer choice">
    <div class="radio-answer">
      <input type="checkbox"
             id="radio_2"
             name="questions[${questionIndex}][correct_answer]"
             value="2">
      <label for="radio_2">Correct answer</label>
    </div>
    <br><br>
    <label class="form-label">Third answer</label>
    <input class="input-text"
           type="text"
           name="questions[${questionIndex}][option_3]"
           placeholder="Enter an answer choice">
    <div class="radio-answer">
      <input type="checkbox"
             id="radio_3"
             name="questions[${questionIndex}][correct_answer]"
             value="3">
      <label for="radio_3">Correct answer</label>
    </div>
  </div>
    `;

    console.log("add clicked");
    $('.questions-container').append($question);
    questionIndex++;
    updateQuestionNum();
  };


  $('#btn-add-question').on('click', () => {
    addQuestion();
  });

  $('body').on('click', '.btn-remove-question', function() {
    console.log("remove clicked", this);
    $(this).parents('.question').remove();
    questionIndex--;
    updateQuestionNum();
  });

  $('#new-quiz-form').on('submit', function() {
    // console.log("submit button clicked");
    const data = $('#new-quiz-form').serialize();
    $.post('/quizzes', data, (response) => {
      console.log('post response:', response);

    });
  });
});
