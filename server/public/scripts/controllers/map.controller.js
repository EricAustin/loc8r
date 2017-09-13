
myApp.controller('MapController', ['MapService', 'NgMap', function (MapService, NgMap) {
  console.log('Map Controller loaded.');


  var self = this;
  var bounds = new google.maps.LatLngBounds();
  var newPin = {};





  self.drawMap = function () {
    self.locations = MapService.locations
    console.log('MapService.locations', MapService.locations);

    console.log('self.locations', self.locations);

    for (var i = 0; i < self.locations.length; i++) {
      var latlng = new google.maps.LatLng(self.locations[i].location[0], self.locations[i].location[1]);
      console.log(self.locations[i][0], self.locations[i][1]);



      bounds.extend(latlng);
    }

    NgMap.getMap().then(function (map) {
      // console.log(map.getCenter());
      console.log(map);
      console.log('markers', map.markers);
      // console.log('shapes', map.shapes);
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    });
  }






  self.addLocation = function () {


    function success(pos) {
      console.log('pos is', pos);

      var crd = pos.coords;
      newPin.username = "Eric";
      newPin.location = [crd.latitude, crd.longitude];
      newPin.group = "test"

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      MapService.addPin(newPin)

      // self.locations.push([crd.latitude, crd.longitude]);
      self.drawMap();


    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    console.log('navigator.geolocation.getCurrentPosition called');

    navigator.geolocation.getCurrentPosition(success, error, options);

  }


  MapService.getLocations();
console.log('getLocations line85');

  setInterval(function(){self.addLocation()}, 5000);
  console.log('drawMap line 88');
  



}]);



