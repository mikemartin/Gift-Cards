var Expander;

Expander = (function() {
  Expander.selector = '.expander';
  Expander.toggleSelector = '.expander-toggle';
  Expander.contentSelector = '.expander-content';
  Expander.enhancedClass = 'js-expander';
  Expander.expandedClass = 'expanded';

  Expander.enhance = function() {
    var thisClass;
    thisClass = this;
    return $(this.selector).each(function() {
      return new thisClass(this).enhance();
    });
  };

  function Expander(element) {
    this._element = $(element);
    this._toggleElement = this._element.find(this.constructor.toggleSelector);
    this._contentElement = this._element.find(this.constructor.contentSelector);
  }

  Expander.prototype.enhance = function() {
    this._element.addClass(this.constructor.enhancedClass);
    this._buildUI();
    return this._bindEvents();
  };

  Expander.prototype._buildUI = function() {
    return this._contentElement.hide();
  };

  Expander.prototype._bindEvents = function() {
    return this._toggleElement.click((function(_this) {
      return function() {
        return _this._toggleContent();
      };
    })(this));
  };

  Expander.prototype._toggleContent = function() {
    this._contentElement.toggle();
    return this._element.toggleClass(this.constructor.expandedClass);
  };

  return Expander;
})();




$(function() {
  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');
  var signUp = $('.sign-up');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

  // underline under the active nav item
  $(".nav .nav-link").click(function() {
    $(".nav .nav-link").each(function() {
      $(this).removeClass("active-nav-item");
    });
    $(this).addClass("active-nav-item");
    $(".nav .more").removeClass("active-nav-item");
  });
  
  
  $('.datepicker').pickadate();
  
  return Expander.enhance();
});

