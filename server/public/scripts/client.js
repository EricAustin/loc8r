var myApp = angular.module('myApp', ['ngMap']);


myApp.controller('MyController', function (NgMap) {

  var self = this;
  var bounds = new google.maps.LatLngBounds();
  

  self.locations = [[43.993125, -92.202571], [43.987305, -92.202786], [43.987802, -92.230248], [43.973732, -92.236986], [43.982838, -92.232165], [43.987873, -92.215255]];

 

  self.drawMap = function () {

    for (var i = 0; i < self.locations.length; i++) {
      var latlng = new google.maps.LatLng(self.locations[i][0], self.locations[i][1]);
      bounds.extend(latlng);
    }

    NgMap.getMap().then(function (map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      // console.log('shapes', map.shapes);
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    });
  }
 
  
  this.addLocation = function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      self.locations.push([crd.latitude, crd.longitude]);
      self.drawMap();


    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

  }

  self.drawMap();


  // 
  // 
  // 





});