/* eslint-disable camelcase */
$(() => {

  $('#register-btn').on('click', () => {
    $('.login-partial').css("display", "none");
    $('.register-partial').css("display", "flex");
  });

  $('#login-btn').on('click', () => {
    $('.login-partial').css("display", "flex");
    $('.register-partial').css("display", "none");
  });

});
