'use strict';

/* Directives */

angular
		.module('myApp.directives', [])
		.directive(
				'scrollIf',
				function() {

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
