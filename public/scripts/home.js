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

  // Function to display a random picture on quiz card
  let myPictures = ["/docs/card_01.png","/docs/card_02.png","/docs/card_03.png", "/docs/card_04.png", "/docs/card_05.png", "/docs/card_06.png", "/docs/card_07.png", "/docs/card_08.png"];

  const choosePic = function() {
    const imageArray = [...document.querySelectorAll('.card-img')];
    imageArray.forEach(item => {
      let randomNum = Math.floor(Math.random() * myPictures.length);
      const MyPicture = myPictures[randomNum];
      item.setAttribute("src", MyPicture);
    });
  };

  choosePic();

});
