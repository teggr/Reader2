'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module("myApp.services", []);

services.value("preferences", {
	showAllFeeds : true,
	showAllItems : true,
	sortItemsBy : 1,
	startPage : 2,
	openLinksInNewWindow : true,
	itemsPerPage : 15
});

services.factory("feedService", [ "$http", function($http) {
	return {
		loadFeeds : function($scope) {
			$scope.loadingFeeds = true;
			$http.get("api/feeds.json").success(function(data, status, headers, config) {
				$scope.feeds.length = 0;
				angular.forEach(data.feeds, function(value, key) {
					this.push(value);
				}, $scope.feeds);
				$scope.loadingFeeds = false;
			}).error(function(data, status, headers, config){
				$scope.loadingFeeds = false;
			});
		},
		loadItems : function($scope,id) {
			$scope.items.length = 0;
			$http.get("api/" + id + ".json").success(function(data, status, headers, config) {
				angular.forEach(data.items, function(value, key) {
					this.push(value);
				}, $scope.items);
				angular.copy( data.feed, $scope.feed );
				$scope.nextFetch = data.nextFetch;
			}).error(function(data, status, headers, config) {
				$scope.loading = false;
			});
		}
	};
} ]);