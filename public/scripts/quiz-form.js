/* eslint-disable camelcase */
$(() => {

  const $step1 = $('.step_1');
  const $step2 = $('.step_2');
  const $step3 = $('.step_3');

  $('#btn-add-questions').on('click', () => {
    console.log("add questions button clicked");
    $step1.css("display", "none");
    $step2.css("display", "flex");
  });

  $('#new-quiz-form').on('submit', function(event) {
    event.preventDefault();
    console.log("submit button clicked");
    $step2.css("display", "none");
    $step3.css("display", "flex");
  });

});


