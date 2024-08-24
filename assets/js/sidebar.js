$(document).ready(function () {
  var $sidebar = $("aside");
  var $content = $(".menuContent");
  var $mainContent = $(".mainContent");
  var $toggleButtonSidebar = $(".icon_humberger_sidebar");
  var $toggleButtonNavbar = $(".icon_humberger_navbar");
  var $textSidebar = $(".text_sidebar");
  var $logoName = $(".logo_name");
  var $logoSidebar = $(".logo-sidebar");
  var $runReport = $(".run_report");
  var $backdrop = $(".backdrop");

  function handleSidebarToggle() {
    var screenWidth = $(window).width();

    if (screenWidth < 576) {
      $toggleButtonSidebar.hide();
      $toggleButtonNavbar.show();
      $sidebar
        .css({
          position: "absolute",
          display: "none",
        })
        .removeClass("expanded");
      $content.css({
        width: "100%",
        "margin-left": "0px",
      });
      $mainContent.css({
        width: "100%",
        "margin-left": "0px",
      });
      $logoSidebar.css("justify-content", "space-between");
      $textSidebar.show();
      $logoName.show();
      $runReport.hide();
      $backdrop.hide();
      $("body").removeClass("no-scroll");
    } else if (screenWidth < 992) {
      if ($sidebar.hasClass("expanded")) {
        $sidebar.css("width", "275px");
        $content.css("width", "calc(100% - 275px)");
        $mainContent.css({
          width: "calc(100% - 275px)",
          "margin-left": "275px",
        });
        $logoSidebar.css("justify-content", "space-between");
        $textSidebar.show();
        $logoName.show();
        $runReport.hide();
      } else {
        $sidebar.css("width", "93px");
        $content.css("width", "calc(100% - 93px)");
        $mainContent.css({
          width: "calc(100% - 93px)",
          "margin-left": "93px",
        });
        $logoSidebar.css("justify-content", "center");
        $textSidebar.hide();
        $logoName.hide();
        $runReport.show();
      }
      $toggleButtonSidebar.hide();
      $toggleButtonNavbar.hide();
      $sidebar.css("display", "block");
      $backdrop.hide();
      $("body").removeClass("no-scroll");
    } else {
      $sidebar.css("width", "275px").removeClass("expanded");
      $content.css("width", "calc(100% - 275px)").removeClass("expanded");
      $mainContent
        .css({
          width: "calc(100% - 275px)",
          "margin-left": "275px",
        })
        .removeClass("expanded");
      $logoSidebar.css("justify-content", "space-between");
      $textSidebar.show();
      $logoName.show();
      $runReport.hide();
      $toggleButtonSidebar.show();
      $toggleButtonNavbar.hide();
      $sidebar.css("display", "block");
      $backdrop.hide();
      $("body").removeClass("no-scroll");
    }
  }

  handleSidebarToggle();

  $(window).resize(function () {
    handleSidebarToggle();
  });

  function toggleSidebar() {
    var screenWidth = $(window).width();

    if (screenWidth < 576) {
      if ($sidebar.hasClass("expanded")) {
        $sidebar.removeClass("expanded").css("display", "none");
        $backdrop.hide();
        $("body").removeClass("no-scroll");
        $toggleButtonSidebar.hide();
        $toggleButtonNavbar.show();
      } else {
        $sidebar.addClass("expanded").css({
          width: "275px",
          position: "absolute",
          display: "block",
          left: 0,
          top: 0,
          "z-index": 999,
          transition: ".5s",
        });
        $textSidebar.show();
        $logoName.show();
        $runReport.hide();
        $backdrop.show();
        $("body").addClass("no-scroll");
        $toggleButtonSidebar.show();
        $toggleButtonNavbar.hide();
      }
    } else {
      if ($sidebar.hasClass("expanded")) {
        $sidebar.removeClass("expanded").css("width", "93px");
        $content.removeClass("expanded").css("width", "calc(100% - 93px)");
        $mainContent.removeClass("expanded").css({
          width: "calc(100% - 93px)",
          "margin-left": "93px",
        });
        $logoSidebar.css("justify-content", "center");
        $textSidebar.hide();
        $logoName.hide();
        $runReport.show();
        $toggleButtonSidebar.hide();
        $toggleButtonNavbar.show();
      } else {
        $sidebar.addClass("expanded").css("width", "275px");
        $content.addClass("expanded").css("width", "calc(100% - 275px)");
        $mainContent.addClass("expanded").css({
          width: "calc(100% - 275px)",
          "margin-left": "275px",
        });
        $logoSidebar.css("justify-content", "space-between");
        $textSidebar.show();
        $logoName.show();
        $runReport.hide();
        $toggleButtonSidebar.show();
        $toggleButtonNavbar.hide();
      }
    }
  }

  $toggleButtonSidebar.click(toggleSidebar);
  $toggleButtonNavbar.click(toggleSidebar);

  $backdrop.click(function () {
    $sidebar.removeClass("expanded").css("display", "none");
    $backdrop.hide();
    $("body").removeClass("no-scroll");
    $toggleButtonSidebar.hide();
    $toggleButtonNavbar.show();
  });
});
