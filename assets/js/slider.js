$(document).ready(function () {
  var swiperAr = new Swiper(".swiper-container-ar", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination-ar",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-ar",
      prevEl: ".swiper-button-prev-ar",
    },
  });

  // Add event listeners for custom navigation buttons
  $(".swiper-button-next-ar").on("click", function () {
    swiperAr.slideNext();
  });

  $(".swiper-button-prev-ar").on("click", function () {
    swiperAr.slidePrev();
  });

  // Repeat for other Swiper instances if needed
  var swiperExpenses = new Swiper(".swiper-container-expenses", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination-expenses",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-expenses",
      prevEl: ".swiper-button-prev-expenses",
    },
  });

  $(".swiper-button-next-expenses").on("click", function () {
    swiperExpenses.slideNext();
  });

  $(".swiper-button-prev-expenses").on("click", function () {
    swiperExpenses.slidePrev();
  });

  var swiperBurnRate = new Swiper(".swiper-container-burnRate", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination-burnRate",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-burnRate",
      prevEl: ".swiper-button-prev-burnRate",
    },
  });

  $(".swiper-button-next-burnRate").on("click", function () {
    swiperBurnRate.slideNext();
  });

  $(".swiper-button-prev-burnRate").on("click", function () {
    swiperBurnRate.slidePrev();
  });
});
