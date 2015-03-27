(function (jQuery) {
  jQuery.mark = {
    jump: function (options) {
      var defaults = {
        selector: 'a.scroll-on-page-link'
      };
      if (typeof options == 'string') {
        defaults.selector = options;
      }

      options = jQuery.extend(defaults, options);
      return jQuery(options.selector).click(function (e) {
        var jumpobj = jQuery(this);
        var target = jumpobj.attr('href');
        var thespeed = 1000;
        var offset = jQuery(target).offset().top;
        jQuery('html,body').animate({
          scrollTop: offset
        }, thespeed, 'swing');
        e.preventDefault();
      });
    }
  };
})(jQuery);

$(function() {
  
  // Mobile menu
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-expanded');
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
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
  
  
  // Dropdown with Button
  $(".js-dropdown-button").click(function() {
    var $dropdownMenu = $(this).next(".dropdown-menu");
    
    $dropdownMenu.toggleClass("show-menu");
    $dropdownMenu.find("> li").click(function(){
      $dropdownMenu.removeClass("show-menu");
    });
    $(this).next(".dropdown-menu.dropdown-select > li").click(function() {
      $(this).html($(this).html());
    });
  });
  
   // Dropdown without Button
  $(".js-dropdown").click(function() {
    var $dropdownMenu = $(this).find(".dropdown-menu");
    $dropdownMenu.toggleClass("show-menu");
  });

  // Accordion

  $('.accordion').on('click', 'li > a', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
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

  $('.hero-carousel').slick();
  
  $('.slider').slick({
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0px',
  });;
  
  

  jQuery.mark.jump();

});

