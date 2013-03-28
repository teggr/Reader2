'use strict';

/* Controllers */

function FeedsCtrl($scope, $http) {
	$scope.feeds = [];
	$http.get('api/feeds.json').success(function(data) {
		$scope.feeds = data;
	});
}
FeedsCtrl.$inject = [ '$scope', '$http' ];

function FeedCtrl($scope, $http, $anchorScroll, $location) {

	$scope.items = [];
	$scope.nextFetch = null;
	$scope.loading = false;
	$scope.currentItem = null;

	$http.get('api/items.json').success(function(data) {
		$scope.items = data.items;
		$scope.nextFetch = data.nextFetch;
	});
	
	$scope.toggleStar = function($event, item) {
		item.starred = !item.starred;
		$event.preventDefault();
		$event.stopPropagation();
	};
	
	$scope.expand = function($event, item) {
		if ($scope.currentItem != null) {
			$scope.currentItem.expanded = false;
		}
		$scope.currentItem = item;
		$scope.currentItem.expanded = true;
		$scope.currentItem.read = true;
		$event.preventDefault();
	};
	
	$scope.collapse = function($event, item) {
		item.expanded = false;
		$scope.currentItem = null;
		$event.preventDefault();
	};
	
	$scope.nextItem = function($event, item, $index) {
		if ($scope.currentItem != null) {
			$scope.currentItem.expanded = false;
		}
		$scope.currentItem = $scope.items[$index + 1];
		$scope.currentItem.expanded = true;
		$scope.currentItem.read = true;
		$event.preventDefault();
	};
	
	$scope.loadMore = function($event) {
		$scope.loading = true;
		$http.get('api/items.json').success(function(data) {
			angular.forEach(data.items, function(value, key) {
				this.push(value);
			}, $scope.items);
			$scope.nextFetch = data.nextFetch;
			$scope.loading = false;
		}).error(function() {
			$scope.loading = false;
		});
		$event.preventDefault();
	};
	
	$scope.markAllAsRead = function($event) {
		angular.forEach($scope.items, function(value, key) {
			if(!value.read){ 
				value.read = true;
			}
		});
		$event.preventDefault();
	};
	
}
FeedsCtrl.$inject = [ '$scope', '$http', '$anchorScroll', '$location' ];
