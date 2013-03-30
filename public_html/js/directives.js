'use strict';

/* Directives */

var directives = angular
		.module('myApp.directives', []);

directives.directive( 'scrollIf', function() {
	var scrollToElement = function(selector, time,
			verticalOffset) {
		time = typeof (time) != 'undefined' ? time : 0;
		verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset
				: 0;
		var element = $(selector);
		var offset = element.offset();
		var offsetTop = offset.top + verticalOffset;
		$('html, body').animate({
			scrollTop : offsetTop
		}, time);
	};
	return function(scope, element, attr) {
		scope.$watch(attr.scrollIf, function ngShowWatchAction(
				value) {
			if (value) {
				scrollToElement(element);
			}
		});
	};
});

directives.directive('inverted', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) { return !val; });
      ngModel.$formatters.push(function(val) { return !val; });
    }
  };
});

directives.directive('linkButton', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    };
});

directives.directive('innerLinkButton', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    };
});
