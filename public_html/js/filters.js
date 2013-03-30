'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('menuItemSelectedClass',function(){
	  return function(input){
		  return input ? "icon-ok" : "icon-blank"; 
	  };
  }).
  filter('starredItemIcon',function(){
	  return function(item){
		  return item.starred ? "icon-star" : "icon-star-empty"; 
	  };
  });
