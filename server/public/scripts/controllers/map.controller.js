
myApp.controller('MapController', ['MapService', 'NgMap', '$location', function (MapService, NgMap, $location) {

  // var launched;
  var timer
  var test = 0
  var self = this;
  var userID = MapService.newID
  var newPin = {};
  var changePin = {};
  var refreshrate = 15000;
  var options = {
    enableHighAccuracy: true,
    timeout: 7000,
    maximumAge: 0
  };



  self.locations = MapService.locations;
  self.pInfowindow = self.locations.list[0]

  function setTimer() {
    console.log('set timer function');
    if (typeof timer !== 'undefined') {
      console.log('timer if hit');
      clearInterval(timer)
    }

    timer = setInterval(function () {
      self.getLocation()
      console.log('timer started');
      test++;
      console.log(test);
    }, refreshrate);

  } // end setTimer

  function error(err) {
    console.log('getCurrentPosition error hit');
    // console.warn(`ERROR(${err.code}): ${err.message}`);
    self.getLocation();
  }; // end error function used by navigator.geolocation.getCurrentPosition

  // self.map = {};
  NgMap.getMap("map").then(function (map) {
    // console.log('this is  map', map);
    // console.log('this is self.map', self.map);
    self.map = map;
  }); // end NgMap.getMap

  self.showDetails = function (e, pin) {
    console.log('pin clicked, showDetails function');
    // runs when pin is clicked, displays infoWindow 
    self.pInfowindow = pin;
    var now = new Date();
    self.pInfowindow.now = now.getTime();
    // calculate minutes and seconds
    self.pInfowindow.diff = (self.pInfowindow.now - self.pInfowindow.timestamp)
    self.pInfowindow.ms = self.pInfowindow.diff % 1000;
    self.pInfowindow.diff = (self.pInfowindow.diff - self.pInfowindow.ms) / 1000;
    self.pInfowindow.seconds = (self.pInfowindow.diff % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    self.pInfowindow.diff = (self.pInfowindow.diff - self.pInfowindow.seconds) / 60;
    self.pInfowindow.minutes = self.pInfowindow.diff % 60;
    self.pInfowindow.hours = (self.pInfowindow.diff - self.pInfowindow.minutes) / 60;
    self.map.showInfoWindow('infoWindow', this);
  } // end self.showDetails

  self.getLocation = function () {
    console.log('getLocation hit');
    function success(pos) {
      console.log('getLocation success hit');
      newPin.location = [pos.coords.latitude, pos.coords.longitude];
      if (pos.coords.speed) {
        newPin.speed = 0;
      } else {
        newPin.speed = (pos.coords.speed * 2.24);
      };
      self.updateLocation();
      // setTimer();
    };
    navigator.geolocation.getCurrentPosition(success, error, options);


  } // end self.getLocation


  self.addLocation = function (username, group) {
    console.log('addLocation hit');
    
    if (newPin.location == undefined) {
      console.log('newPin.location', newPin.location);
      setTimeout(function () {
        self.addLocation(username, group);
      }, 1000);
    } else {
      console.log('addLocation else hit');
      
      newPin.username = username;
      newPin.group = group.toUpperCase();
      var timestamp = new Date();
      newPin.timestamp = timestamp.getTime();
      MapService.addPin(newPin)
      // setTimer(function () { console.log('addLocation timer started') });
      $location.path("map");
      setTimer();
    }
  } // end self.addLocation

  self.updateLocation = function (username, group) {
    console.log('updateLocation hit');
    // function success(pos) {
    // newPin.location = [pos.coords.latitude, pos.coords.longitude];
    var then = new Date();
    newPin.timestamp = then.getTime();
    MapService.updatePin(newPin)
    // }; // end success function
    // setTimer();
  } // end self.updateLocation

  self.deletePin = function (username, group) {
    console.log('deleteLocation hit');
    MapService.deletePin();
    $location.path("");
  } // end self.deletePin



  self.getLocation();
}]);
