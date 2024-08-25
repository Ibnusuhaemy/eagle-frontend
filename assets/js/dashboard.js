$(document).ready(function () {
  function setupExpandableSections(containerId) {
    const container = $(containerId);

    // Show all sub-rows by default
    container.find(".sub-row").show();

    // Set initial icon state
    container
      .find(".expandable")
      .removeClass("expanded")
      .find("i")
      .removeClass("icon-arrow-up")
      .addClass("icon-arrow-down");

    // Toggle expandable rows
    container.on("click", ".expandable", function () {
      const $this = $(this);
      const $icon = $this.find("i");

      $icon.toggleClass("icon-arrow-up icon-arrow-down");
      $this.toggleClass("expanded");

      $this.nextUntil(".expandable, .neutral-table").slideToggle();
    });

    // Expand all rows
    container.on("click", "#expand-all", function () {
      container.find(".sub-row").slideDown();
      container
        .find(".expandable")
        .addClass("expanded")
        .find("i")
        .removeClass("icon-arrow-down")
        .addClass("icon-arrow-up");

      // Update button colors
      $(this)
        .addClass("btn-primary")
        .removeClass("btn-custom-grey bg-primary-200");
      container
        .find("#collapse-all")
        .addClass("btn-custom-grey bg-primary-200")
        .removeClass("btn-primary");

      // Update icon colors
      $(this).find("i").addClass("text-white-icon");
      container.find("#collapse-all").find("i").removeClass("text-white-icon");
    });

    // Collapse all rows
    container.on("click", "#collapse-all", function () {
      container.find(".sub-row").slideUp();
      container
        .find(".expandable")
        .removeClass("expanded")
        .find("i")
        .removeClass("icon-arrow-up")
        .addClass("icon-arrow-down");

      // Update button colors
      $(this)
        .addClass("btn-primary")
        .removeClass("btn-custom-grey bg-primary-200");
      container
        .find("#expand-all")
        .addClass("btn-custom-grey bg-primary-200")
        .removeClass("btn-primary");

      // Update icon colors
      $(this).find("i").addClass("text-white-icon");
      container.find("#expand-all").find("i").removeClass("text-white-icon");
    });
  }

  // Initialize expandable sections for different containers
  setupExpandableSections("#profitLostTab");
  setupExpandableSections("#balanceSheetTab");
  setupExpandableSections("#profitLost");
  setupExpandableSections("#balanceSheet");
  // Add more containers as needed
});
