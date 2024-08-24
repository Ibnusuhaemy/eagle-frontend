var swiperAr = new Swiper(".swiper-container-ar", {
  // Optional parameters
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
document
  .querySelector(".swiper-button-next-ar")
  .addEventListener("click", function () {
    swiperAr.slideNext();
  });

document
  .querySelector(".swiper-button-prev-ar")
  .addEventListener("click", function () {
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

document
  .querySelector(".swiper-button-next-expenses")
  .addEventListener("click", function () {
    swiperExpenses.slideNext();
  });

document
  .querySelector(".swiper-button-prev-expenses")
  .addEventListener("click", function () {
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

document
  .querySelector(".swiper-button-next-burnRate")
  .addEventListener("click", function () {
    swiperBurnRate.slideNext();
  });

document
  .querySelector(".swiper-button-prev-burnRate")
  .addEventListener("click", function () {
    swiperBurnRate.slidePrev();
  });
