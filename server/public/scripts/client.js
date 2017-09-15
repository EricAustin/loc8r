var myApp = angular.module('myApp', ['ngMap', 'ngRoute']);



myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MapController',
      controllerAs: 'mc'
  }).when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapController',
      controllerAs: 'mc'
  });


}]) //end app config