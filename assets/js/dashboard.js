$(document).ready(function () {
  $(".sub-row").show();

  $(".expandable")
    .removeClass("expanded")
    .find("i")
    .removeClass("icon-arrow-up")
    .addClass("icon-arrow-down");

  $(".expandable").click(function () {
    const $this = $(this);
    const $icon = $this.find("i");

    $icon.toggleClass("icon-arrow-up icon-arrow-down");
    $this.toggleClass("expanded");

    $this.nextUntil(".expandable, .neutral-table").slideToggle();
  });

  // Expand all rows
  $("#expand-all").click(function () {
    $(".sub-row").slideDown();
    $(".expandable")
      .addClass("expanded")
      .find("i")
      .removeClass("icon-arrow-up")
      .addClass("icon-arrow-down");
  });

  // Collapse all rows
  $("#collapse-all").click(function () {
    $(".sub-row").slideUp();
    $(".expandable")
      .removeClass("expanded")
      .find("i")
      .removeClass("icon-arrow-down")
      .addClass("icon-arrow-up");
  });
});
