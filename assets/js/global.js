// show and hide chart
$(document).ready(function () {
  $("#toggle-password").on("click", function () {
    var passwordField = $("#password");
    var icon = $(this);

    if (passwordField.attr("type") === "password") {
      passwordField.attr("type", "text");
      icon.removeClass("icon-eye").addClass("icon-eye-off");
    } else {
      passwordField.attr("type", "password");
      icon.removeClass("icon-eye-off").addClass("icon-eye");
    }
  });

  // Show and Hide Chart
  $(".showHideChart").click(function () {
    var target = $(this).data("target");
    var icon = $(this).find("i");

    $(target).toggleClass("collapse");

    icon.css("transition", "transform 0.3s ease");

    if ($(target).hasClass("collapse")) {
      icon.removeClass("icon-arrow-up").addClass("icon-arrow-down");
      icon.css("transform", "rotate(0deg)");
    } else {
      icon.removeClass("icon-arrow-down").addClass("icon-arrow-up");
      icon.css("transform", "rotate(180deg)");
    }
  });

  // Dahsboard Report
  $("#pills-tab .nav-link-report").on("click", function () {
    $("#pills-tab .nav-link-report").removeClass("active-report");

    $(this).addClass("active-report");
    $(this).removeClass("active");

    $("#pills-tabContent .tab-pane").removeClass("active-tabs active show");

    $($(this).data("bs-target")).addClass("active-tabs show");
  });

  $(".nav-link-tabs").on("click", function () {
    $(".nav-link-tabs").removeClass("active-report-tabs");

    $(this).addClass("active-report-tabs");
  });

  // Profit & Lost
  $("#pills-tab .nav-link-profit").on("click", function () {
    $("#pills-tab .nav-link-profit").removeClass("active-profit");

    $(this).addClass("active-profit");
    $(this).removeClass("active");

    $("#pills-tabContent .tab-pane").removeClass(
      "active-profit-tabs active show"
    );

    $($(this).data("bs-target")).addClass("active-profit-tabs show");
  });

  // Toggle
  $(document).ready(function () {
    // Tab switch event
    $('button[data-bs-toggle="pill"]').on("shown.bs.tab", function (e) {
      $('svg[id="icon_tabs"]').each(function () {
        $(this).removeClass("active_icon").attr("fill", "#7C8FAC");
      });

      $(this)
        .find('svg[id="icon_tabs"]')
        .addClass("active_icon")
        .attr("fill", "#4474FD");
    });

    $("button.nav-link.active-profit")
      .find('svg[id="icon_tabs"]')
      .addClass("active_icon")
      .attr("fill", "#4474FD");

    $(".custom-switch input[type='checkbox']").change(function () {
      const $this = $(this);
      const $parent = $this.closest(".custom-switch");

      if ($this.is(":checked")) {
        $parent.css("background-color", "#5d87ff");
        $parent.find(".toggle-circle").css("transform", "translateX(16px)");
      } else {
        $parent.css("background-color", "#6e7a8a");
        $parent.find(".toggle-circle").css("transform", "translateX(0)");
      }
    });
  });

  // DataTable Report
  $(document).ready(function () {
    let table = new DataTable("#myTable", {
      responsive: true,
      lengthChange: false,
      info: false,
      searching: true,
      scrollX: true,
      autoWidth: false,
      dom: 't<"d-none"ip>',
      ordering: false,
      pagingType: "numbers",
      pageLength: 10,
    });

    function updateInfo() {
      let info = table.page.info();
      let pagination = $("#custom_pagination");

      $("#myTable_info").html(
        `Showing ${info.end} out of ${info.recordsTotal} entries`
      );

      pagination.empty();

      for (let i = 1; i <= info.pages; i++) {
        pagination.append(`<button class="dt-paging-button ${
          i === info.page + 1 ? "current" : ""
        }" 
          role="link" type="button" aria-controls="myTable" data-dt-idx="${
            i - 1
          }">${i}</button>`);
      }

      $(".dt-paging-button").on("click", function () {
        let pageIndex = $(this).data("dt-idx");
        table.page(pageIndex).draw(false);
      });
    }

    updateInfo();

    table.on("draw", function () {
      updateInfo();
    });

    $("#customSearch").on("keyup", function () {
      table.search(this.value).draw();
    });
  });
});
