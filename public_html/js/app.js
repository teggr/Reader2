'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/feeds', {templateUrl: 'partials/feeds.html', controller: FeedsCtrl});
    $routeProvider.when('/feeds/:id', {templateUrl: 'partials/feed.html', controller: FeedCtrl});
    $routeProvider.otherwise({redirectTo: '/feeds'});
  }]);
