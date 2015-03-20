$(function() {
  
  // Mobile menu toggle
  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass("active-nav-item");
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

  // Underline under the active nav item
  $(".nav .nav-link").click(function() {
    $(".nav .nav-link").each(function() {
      $(this).removeClass("active-nav-item");
    });
    $(this).addClass("active-nav-item");
    $(".nav .more").removeClass("active-nav-item");
  });
  
  
  // Expanders
  $('#js-expander-trigger').click(function(){
    $(this).toggleClass("expander-hidden");
  });

  // Smooth scrolling for anchor links
  smoothScroll.init({
      speed: 500,
      easing: 'easeInOutCubic',
      offset: 48,
      updateURL: true
  });
  
  // Highlight active item in Style Guide menu
  var setupStyleMenu = function() { 
    $('.style-guide section')
      .waypoint(function(direction) {
        var $links = $('a[href="#' + this.id + '"]');
        $links.toggleClass('active', direction === 'down');
      }, {
        offset: '48px'
      })
      .waypoint(function(direction) {
        var $links = $('a[href="#' + this.id + '"]');
        $links.toggleClass('active', direction === 'up');
      }, {
        offset: function() {
          return -$(this).height();
        }
      });

    
    $('.style-guide .style-type')
      .waypoint(function(direction) {
        var $links = $('a[href="#' + this.id + '"]');
        if ($links.hasClass('expander-hidden')) {
          $links.removeClass('expander-hidden');
        } else {
          $links.addClass('expander-hidden', direction === 'down');
        }
      }, {
        offset: '48px'
      })
      .waypoint(function(direction) {
        var $links = $('a[href="#' + this.id + '"]');
      
        if ($links.hasClass('expander-hidden')) {
          $links.removeClass('expander-hidden');
        } else {
          $links.addClass('expander-hidden', direction === 'up');
        }
      }, {
        offset: function() {
          return -$(this).height();
        }
      });

    $('#style-nav').waypoint('sticky');
  };
  

  // Enable Waypoint on Desktop only
  var oldWindowWidth;

  var checkWidth = function() {
    if (!oldWindowWidth) return;
    var windowWidth = $(window).width();
    if (oldWindowWidth < 860 && windowWidth > 860) {
      setupStyleMenu();
    }
    else if (oldWindowWidth > 860 && windowWidth < 860) {
      $('#style-nav').waypoint('destroy');
    }
    oldWindowWidth = windowWidth;
  };
  
  $(window).resize(checkWidth).load(function() {
    var windowWidth = $(window).width();
    if (windowWidth > 860) {
      setupStyleMenu();
    }
    oldWindowWidth = windowWidth;
  });

  
  // Initialize datepicker
  $('.datepicker').pickadate();
  
  // Setup autotab and formating for form fields
  var setupAutoTab = function() {
    $.autotab({ tabOnSelect: true });
    $('.number').autotab('filter', 'number');
    $('.text').autotab('filter', 'text');
    $('.alpha').autotab('filter', 'alpha');
    $('.alphanumeric').autotab('filter', { format: 'alphanumeric', uppercase: true });
  };
  
  setupAutoTab();

  
  
});

