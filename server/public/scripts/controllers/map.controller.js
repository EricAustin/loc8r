
myApp.controller('MapController', ['MapService', function (MapService) {
  // console.log('Map Controller loaded.');

  var self = this;
  var userID = MapService.newID
  var newPin = {};
  self.locations = MapService.locations;


  self.drawMap = function () {
    // console.log('redraw map button clicked');
    // self.drawMap.when(MapService.getLocations).then(MapService.drawMap());
    // MapService.getLocations(function() {MapService.drawMap()});
    MapService.getLocations();
    // console.log('MapService.locations is', MapService.locations);
    // console.log('self.locations is', self.locations);
  }







  self.addLocation = function (username, group) {
    console.log('addLocation hit');

    function success(pos) {
      newPin.username = username;
      newPin.location = [pos.coords.latitude, pos.coords.longitude];
      newPin.group = group;
      self.sendObject(newPin);

    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    var options = {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(success, error, options);


  }



  self.sendObject = function (newPin) {
    MapService.addPin(newPin)

  }


}]);
