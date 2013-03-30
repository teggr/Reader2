'use strict';

/* Controllers */

function AppCtrl($scope, $http, preferences, feedService) {

	$scope.loadingFeeds = false;
	$scope.items = [];
	$scope.feeds = [];
	$scope.nextFetch = null;
	$scope.search = {
		show: false
	};
	$scope.feed = {};
	
	$scope.preferences = preferences;
	$scope.feedService = feedService;
	
	$scope.showAllFeeds = function($event) {
		$scope.preferences.showAllFeeds = true;
		$event.preventDefault();
	};

	$scope.showUpdatedFeeds = function($event) {
		$scope.preferences.showAllFeeds = false;
		$event.preventDefault();
	};
	
	$scope.showAllItems = function($event) {
		$scope.preferences.showAllItems = true;
		$scope.feedService.loadItems($scope,"all-items")
		$event.preventDefault();
	};

	$scope.showUpdatedItems = function($event) {
		$scope.preferences.showAllItems = false;
		$scope.feedService.loadItems($scope,"updated-items");
		$event.preventDefault();
	};
	
	$scope.sortItemsByNewest = function($event) {
		$scope.preferences.sortItemsBy = 0;
		$event.preventDefault();
	};
	
	$scope.sortItemsByOldest = function($event) {
		$scope.preferences.sortItemsBy = 1;
		$event.preventDefault();
	};
	
	$scope.sortItemsByMagic = function($event) {
		$scope.preferences.sortItemsBy = 2;
		$event.preventDefault();
	};
	
	$scope.refresh = function($event) {
		$scope.feedService.loadFeeds($scope);
		$event.preventDefault();
	};
	
	$scope.markAllAsRead = function($event) {
		angular.forEach($scope.items, function(value, key) {
			if (!value.read) {
				value.read = true;
			}
		});
		$event.preventDefault();
	};
	
	$scope.showSearch = function($event) {
		$scope.search.show = true;
		$event.preventDefault();
	};
	
	$scope.search = function($event) {
		$scope.search.show = false;
		$scope.feedService.loadItems($scope,"search-items");
		$event.preventDefault();
	};
	
	$scope.cancelSearch = function($event) {
		$scope.search.show = false;
		$event.preventDefault();
	};

}
AppCtrl.$inject = [ '$scope', '$http', 'preferences', 'feedService' ];

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

function FeedsCtrl($scope, $http) {
	$scope.feedService.loadFeeds($scope);
	$scope.feedFilter = function(feed) {
		return (feed.count && feed.count > 0) || $scope.preferences.showAllFeeds;
	};
}
FeedsCtrl.$inject = [ '$scope', '$http' ];

function FeedCtrl($scope, $http, $routeParams) {

	$scope.loading = false;
	$scope.currentItem = null;

	$scope.feedService.loadItems($scope,$routeParams.id);
	
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
		$scope.feedService.loadItems($scope,$routeParams.id);
		$event.preventDefault();
	};
	
	$scope.sortItemsBy = function(item) {
		if( $scope.preferences.sortItemsBy == 0 ) {
			return "-publishTime";
		} else {
			return "+publishTime";			
		}
	};

	

}
FeedsCtrl.$inject = [ '$scope', '$http', '$routeParams' ];
