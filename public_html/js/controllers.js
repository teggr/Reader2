'use strict';

/* Controllers */


function FeedsCtrl($scope, $http) {
	$scope.feeds = [];
	$http.get('api/feeds.json').success(function(data) {
		$scope.feeds = data;
	});
}
FeedsCtrl.$inject = ['$scope', '$http'];


function FeedCtrl($scope, $http) {
	$scope.items = [];
	$http.get('api/items.json').success(function(data) {
		$scope.items = data;
	});
}
FeedsCtrl.$inject = ['$scope', '$http'];
