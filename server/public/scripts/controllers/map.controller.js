
myApp.controller('MapController', ['MapService', function (MapService) {
  // console.log('Map Controller loaded.');

  var self = this;
  var userID = MapService.newID
  var newPin = {};
  var changePin = {};

  self.locations = MapService.locations;

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
      newPin.username = username;
      newPin.location = [pos.coords.latitude, pos.coords.longitude];
      newPin.group = group;
      self.sendObject(newPin);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
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
