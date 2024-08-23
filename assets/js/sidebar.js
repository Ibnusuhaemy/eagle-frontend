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

  function handleSidebarToggle() {
    var screenWidth = $(window).width();

    if (screenWidth < 576) {
      $toggleButtonSidebar.show();
      $toggleButtonNavbar.hide();
      $sidebar.css("width", "275px");
      $content.css("width", "100%");
      $mainContent.css("width", "100%");
      $logoSidebar.css("justify-content", "space-between");
      $textSidebar.show();
      $logoName.show();
      $runReport.hide();
    } else if (screenWidth < 992) {
      if ($sidebar.hasClass("expanded")) {
        $toggleButtonSidebar.show();
        $toggleButtonNavbar.hide();
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
        $toggleButtonSidebar.hide();
        $toggleButtonNavbar.show();
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
    } else {
      $toggleButtonSidebar.show();
      $toggleButtonNavbar.hide();
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
    }
  }

  handleSidebarToggle();

  $(window).resize(function () {
    handleSidebarToggle();
  });

  $toggleButtonSidebar.click(function () {
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
  });

  $toggleButtonNavbar.click(function () {
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
  });
});
