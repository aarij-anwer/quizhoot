/* eslint-disable camelcase */
$(() => {

  const $step1 = $('.step_1');
  const $step2 = $('.step_2');
  const $removeBtn = $('#btn-remove-question');

  $('#btn-add-questions').on('click', () => {
    $step1.css("display", "none");
    $step2.css("display", "flex");
  });

  $('#btn-back').on('click', () => {
    $step2.css("display", "none");
    $step1.css("display", "flex");
  });

  let $question = `
  <div class="question">
  <hr class="hr">
  <br><br>
  <div class="question-header">
    <label class="form-label">Question</label>
    <button class="secondary-button"
                    id="btn-remove-question"
                    type="button">Remove</button>
  </div>
  <br><br>
  <input class="input-text"
         type="text"
         id="question"
         name="question_text"
         placeholder="Enter a question">
  <br><br>
  <label class="form-label">First answer</label>
  <input class="input-text"
         type="text"
         name="option_1"
         placeholder="Enter an answer choice">
  <div class="radio-answer">
    <input type="checkbox"
           id="radio_1"
           name="correct_answer"
           value="1"
           checked="checked">
    <label for="radio_1">Correct answer</label>
  </div>
  <br><br>
  <label class="form-label">Second answer</label>
  <input class="input-text"
         type="text"
         name="option_2"
         placeholder="Enter an answer choice">
  <div class="radio-answer">
    <input type="checkbox"
           id="radio_2"
           name="correct_answer"
           value="2">
    <label for="radio_2">Correct answer</label>
  </div>
  <br><br>
  <label class="form-label">Third answer</label>
  <input class="input-text"
         type="text"
         name="option_3"
         placeholder="Enter an answer choice">
  <div class="radio-answer">
    <input type="checkbox"
           id="radio_3"
           name="correct_answer"
           value="3">
    <label for="radio_3">Correct answer</label>
  </div>
</div>
  `;

  $('#btn-add-question').on('click', () => {
    console.log("add clicked");
    $('.questions-container').prepend($question);
  });

  $('#btn-remove-question').on('click', () => {
    console.log("remove clicked");
    $('.questions-container').last().remove();

  });

  $('#new-quiz-form').on('submit', function() {
    // console.log("submit button clicked");
    const data = $('#new-quiz-form').serialize();
    $.post('/quizzes', data, (response) => {
      console.log('post response:', response);

    });
  });
});
