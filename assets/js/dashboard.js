$(document).ready(function () {
  function setupExpandableSections(containerId) {
    const container = $(containerId);

    // Show all rows by default
    container.find(".sub-row, .sub-sub-row, .sub-sub-sub-row").show();

    // Set initial icon state to expanded
    container
      .find(".expandable, .expandable-sub, .expandable-sub-sub")
      .addClass("expanded")
      .find("i")
      .removeClass("icon-arrow-down")
      .addClass("icon-arrow-up");

    function toggleRows($element, nextSelector, rowClass) {
      const isExpanded = $element.hasClass("expanded");
      $element.nextUntil(nextSelector).each(function () {
        const $nextRow = $(this);
        if ($nextRow.hasClass(rowClass)) {
          if (isExpanded) {
            $nextRow.slideDown();
          } else {
            $nextRow.slideUp();
          }
        }
      });
    }

    function closeNestedExpandableRows(
      $element,
      nextSelector,
      nestedSelector,
      rowClass
    ) {
      if (!$element.hasClass("expanded")) {
        $element.nextUntil(nextSelector).each(function () {
          const $nextRow = $(this);
          if ($nextRow.hasClass(nestedSelector)) {
            $nextRow
              .removeClass("expanded")
              .find("i")
              .removeClass("icon-arrow-up")
              .addClass("icon-arrow-down");
            $nextRow.nextUntil(nextSelector).each(function () {
              const $nextSubRow = $(this);
              if ($nextSubRow.hasClass(rowClass)) {
                $nextSubRow.slideUp();
              }
            });
          }
        });
      }
    }

    // Toggle primary expandable rows
    container.on("click", ".expandable", function () {
      const $this = $(this);
      const $icon = $this.find("i");

      $icon.toggleClass("icon-arrow-up icon-arrow-down");
      $this.toggleClass("expanded");

      // Toggle related rows
      toggleRows($this, ".expandable, .neutral-table", "sub-row");

      // Close nested expandable-sub and expandable-sub-sub rows
      closeNestedExpandableRows(
        $this,
        ".expandable, .neutral-table",
        "expandable-sub",
        "sub-sub-row"
      );
      closeNestedExpandableRows(
        $this,
        ".expandable, .neutral-table",
        "expandable-sub-sub",
        "sub-sub-sub-row"
      );
    });

    // Toggle nested expandable-sub rows
    container.on("click", ".expandable-sub", function () {
      const $this = $(this);
      const $icon = $this.find("i");

      $icon.toggleClass("icon-arrow-up icon-arrow-down");
      $this.toggleClass("expanded");

      // Toggle related rows
      toggleRows(
        $this,
        ".expandable, .expandable-sub, .neutral-table",
        "sub-sub-row"
      );

      // Close nested expandable-sub-sub rows
      closeNestedExpandableRows(
        $this,
        ".expandable, .expandable-sub, .neutral-table",
        "expandable-sub-sub",
        "sub-sub-sub-row"
      );
    });

    // Toggle nested expandable-sub-sub rows
    container.on("click", ".expandable-sub-sub", function () {
      const $this = $(this);
      const $icon = $this.find("i");

      $icon.toggleClass("icon-arrow-up icon-arrow-down");
      $this.toggleClass("expanded");

      // Toggle related rows
      toggleRows(
        $this,
        ".expandable, .expandable-sub, .expandable-sub-sub, .neutral-table",
        "sub-sub-sub-row"
      );
    });

    // Expand all rows
    container.on("click", "#expand-all", function () {
      container.find(".sub-row, .sub-sub-row, .sub-sub-sub-row").slideDown();
      container
        .find(".expandable, .expandable-sub, .expandable-sub-sub")
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
      container.find(".sub-row, .sub-sub-row, .sub-sub-sub-row").slideUp();
      container
        .find(".expandable, .expandable-sub, .expandable-sub-sub")
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

  setupExpandableSections("#profitLostTab");
  setupExpandableSections("#balanceSheetTab");
  setupExpandableSections("#profitLost");
  setupExpandableSections("#balanceSheet");
});

$(document).ready(function () {
  var $compareButton = $("#btn_compare");

  var $compareSnapshot = $("#compare_financial_snapshot");
  var $defaultSnapshot = $("#default_financial_snapshot");
  var $chartLegend = $(".compare_legend");

  var isCompareVisible = false;

  function toggleCompare() {
    if (isCompareVisible) {
      $compareSnapshot.hide();
      $defaultSnapshot.show();
      $chartLegend.hide();
    } else {
      $compareSnapshot.css("display", "flex");
      $defaultSnapshot.hide();
      $chartLegend.css("display", "flex");
    }

    isCompareVisible = !isCompareVisible;
  }

  $compareButton.on("click", function () {
    toggleCompare();
  });
});
