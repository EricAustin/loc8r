
myApp.controller('MapController', ['MapService', 'NgMap', '$location', function (MapService, NgMap, $location) {
  // console.log('Map Controller loaded.');

  var self = this;
  var userID = MapService.newID
  var newPin = {};
  var changePin = {};


  self.locations = MapService.locations;

  // self.map = {};
  NgMap.getMap("map").then(function (map) {
    console.log('this is  map', map);
    console.log('this is self.map', self.map);
    self.map = map;
  });

  self.pInfowindow = self.locations.list[0]
  

  self.showDetails = function (e, pin) {
    // console.log('self.locations.list', self.locations.list);
    // console.log('pin', pin);
    // console.log('self.map is ', self.map);
    self.pInfowindow = pin

    self.map.showInfoWindow('infoWindow', this);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  self.drawMap = function () {
    MapService.getLocations();
  }


  self.addLocation = function (username, group) {
    console.log('addLocation hit');

    function success(pos) {
      if (username) {
        newPin.username = username;
      } else { newPin.username = "blank username" };
      newPin.location = [pos.coords.latitude, pos.coords.longitude];
      if (group) {
        newPin.group = group;
      } else {
        newPin.group = "blank group"
      };

      self.sendObject(newPin);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
    $location.path("map");
  }

  self.updateLocation = function (username, group) {
    console.log('updateLocation hit');

    function success(pos) {
      changePin.location = [pos.coords.latitude, pos.coords.longitude];
      self.sendUpdate(changePin);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  self.deletePin = function (username, group) {
    console.log('deleteLocation hit');
    MapService.deletePin();
    $location.path("");
  }

  self.sendObject = function (newPin) {
    console.log('sendObject hit');

    MapService.addPin(newPin)
  }

  self.sendUpdate = function (changePin) {
    console.log('sendUpdate hit');

    MapService.updatePin(changePin)
  }

  self.drawMap();
}]);
