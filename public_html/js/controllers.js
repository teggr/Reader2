'use strict';

/* Controllers */

function AppCtrl($scope, preferences, feedService) {

	$scope.loadingFeeds = false;
	$scope.items = [];
	$scope.feeds = [];
	$scope.nextFetch = null;
	$scope.search = {
		show : false
	};
	$scope.feed = {};

	$scope.preferences = preferences;
	$scope.feedService = feedService;

	$scope.showAllFeeds = function() {
		$scope.preferences.showAllFeeds = true;
	};

	$scope.showUpdatedFeeds = function() {
		$scope.preferences.showAllFeeds = false;
	};

	$scope.showAllItems = function() {
		$scope.preferences.showAllItems = true;
		$scope.feedService.loadItems($scope, "all-items");
	};

	$scope.showUpdatedItems = function() {
		$scope.preferences.showAllItems = false;
		$scope.feedService.loadItems($scope, "updated-items");
	};

	$scope.sortItemsByNewest = function() {
		$scope.preferences.sortItemsBy = 0;
	};

	$scope.sortItemsByOldest = function() {
		$scope.preferences.sortItemsBy = 1;
	};

	$scope.sortItemsByMagic = function() {
		$scope.preferences.sortItemsBy = 2;
	};

	$scope.refresh = function() {
		$scope.feedService.loadFeeds($scope);
	};

	$scope.markAllAsRead = function() {
		angular.forEach($scope.items, function(value, key) {
			if (!value.read) {
				value.read = true;
			}
		});
	};

	$scope.showSearch = function() {
		$scope.search.show = true;
	};

	$scope.search = function() {
		$scope.search.show = false;
		$scope.feedService.loadItems($scope, "search-items");
	};

	$scope.cancelSearch = function() {
		$scope.search.show = false;
	};

}
AppCtrl.$inject = [ '$scope', 'preferences', 'feedService' ];

function MenuCtrl($scope, $location) {

	$scope.isActive = function(route) {
		if (route.indexOf("/") != -1) {
			return $location.path().indexOf("/" + route) != -1;
		} else {
			return $location.path() == ("/" + route);
		}
	};
}
MenuCtrl.$inject = [ '$scope', '$location' ];

function DiscoveryCtrl($scope) {

}
DiscoveryCtrl.$inject = [ '$scope' ];

function FeedsCtrl($scope) {
	if ($scope.feeds.length == 0) {
		$scope.feedService.loadFeeds($scope);
	}
	$scope.feedFilter = function(feed) {
		return (feed.count && feed.count > 0)
				|| $scope.preferences.showAllFeeds;
	};
}
FeedsCtrl.$inject = [ '$scope' ];

function FeedCtrl($scope, $routeParams) {

	$scope.loading = false;
	$scope.currentItem = null;

	$scope.feedService.loadItems($scope, $routeParams.id);

	$scope.toggleStar = function(item) {
		item.starred = !item.starred;
	};

	$scope.expand = function(item) {
		if ($scope.currentItem != null) {
			$scope.currentItem.expanded = false;
		}
		$scope.currentItem = item;
		$scope.currentItem.expanded = true;
		$scope.currentItem.read = true;
	};

	$scope.collapse = function(item) {
		item.expanded = false;
		$scope.currentItem = null;
	};

	$scope.nextItem = function(item, $index) {
		if ($scope.currentItem != null) {
			$scope.currentItem.expanded = false;
		}
		$scope.currentItem = $scope.items[$index + 1];
		$scope.currentItem.expanded = true;
		$scope.currentItem.read = true;
	};

	$scope.loadMore = function() {
		$scope.loading = true;
		$scope.feedService.loadItems($scope, $routeParams.id);
	};

	$scope.sortItemsBy = function(item) {
		if ($scope.preferences.sortItemsBy == 0) {
			return "-publishTime";
		} else {
			return "+publishTime";
		}
	};

}
FeedsCtrl.$inject = [ '$scope', '$routeParams' ];

function FooterCtrl($scope, shareService) {
	$scope.shareService = shareService;
	$scope.shareItem = function(item) {
		$scope.shareService.share(item);
	};
}
FooterCtrl.$inject = [ '$scope', 'shareService' ];

function SettingsCtrl($scope) {

}
SettingsCtrl.$inject = [ '$scope' ];
