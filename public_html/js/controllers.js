'use strict';

/* Controllers */

function AppCtrl($scope, $http, preferences) {

	$scope.loadingFeeds = false;
	$scope.items = [];
	$scope.feeds = [];
	$scope.nextFetch = null;
	$scope.search = {
		show: false
	};
	$scope.feed = {};
	
	$scope.preferences = preferences;
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
		$http.get('api/items.json').success(function(data) {
			$scope.items.length = 0;
			angular.forEach(data.items, function(value, key) {
				this.push(value);
			}, $scope.items);
			angular.copy( data.feed, $scope.feed );
			$scope.nextFetch = data.nextFetch;
		});
		$event.preventDefault();
	};

	$scope.showUpdatedItems = function($event) {
		$scope.preferences.showAllItems = false;
		$http.get('api/updated-items.json').success(function(data) {
			$scope.items.length = 0;
			angular.forEach(data.items, function(value, key) {
				this.push(value);
			}, $scope.items);
			angular.copy( data.feed, $scope.feed );
			$scope.nextFetch = data.nextFetch;
		});
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
		$scope.loadingFeeds = true;
		$http.get('api/feeds.json').success(function(data) {
			$scope.feeds.length = 0;
			angular.forEach(data.feeds, function(value, key) {
				this.push(value);
			}, $scope.feeds);
			$scope.loadingFeeds = false;
		}).error(function(){
			$scope.loadingFeeds = false;
		});
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
		$http.get('api/search-items.json').success(function(data) {
			$scope.items.length = 0;
			angular.forEach(data.items, function(value, key) {
				this.push(value);
			}, $scope.items);
			angular.copy( data.feed, $scope.feed );
			$scope.nextFetch = data.nextFetch;
		});
		$event.preventDefault();
	};
	
	$scope.cancelSearch = function($event) {
		$scope.search.show = false;
		$event.preventDefault();
	};

}
AppCtrl.$inject = [ '$scope', '$http', 'preferences' ];

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
	$http.get('api/feeds.json').success(function(data) {
		$scope.feeds.length = 0;
		angular.forEach(data.feeds, function(value, key) {
			this.push(value);
		}, $scope.feeds);
	});
	$scope.feedFilter = function(feed) {
		return (feed.count && feed.count > 0) || $scope.preferences.showAllFeeds;
	};
}
FeedsCtrl.$inject = [ '$scope', '$http' ];

function FeedCtrl($scope, $http, $routeParams) {

	$scope.loading = false;
	$scope.currentItem = null;

	$http.get('api/items.json').success(function(data) {
		$scope.items.length = 0;
		angular.forEach(data.items, function(value, key) {
			this.push(value);
		}, $scope.items);
		angular.copy( data.feed, $scope.feed );
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
			angular.copy( data.feed, $scope.feed );
			$scope.loading = false;
		}).error(function() {
			$scope.loading = false;
		});
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
