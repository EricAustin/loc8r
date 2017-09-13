var myApp = angular.module('myApp', ['ngMap', 'ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/map.html",
    controller: 'MapController as mc'

  })
    // .when("/map", {
    //   templateUrl: "/views/map.htm",
    //   controller: 'MapController as mc'
    // })

});