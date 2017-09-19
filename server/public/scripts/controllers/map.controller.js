
myApp.controller('MapController', ['MapService', 'NgMap', '$location', function (MapService, NgMap, $location) {
  // console.log('Map Controller loaded.');

  var self = this;
  var userID = MapService.newID
  var newPin = {};
  var changePin = {};
  var timer;
  var refreshrate = 10000;

  function setTimer() {
    timer = setTimeout(function () {
      setTimeout(function () {
        self.updateLocation()
        console.log('timeout hit');
      }, refreshrate);
    })
  }


  self.locations = MapService.locations;

    // self.map = {};
    NgMap.getMap("map").then(function (map) {
      // console.log('this is  map', map);
      // console.log('this is self.map', self.map);
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
      // console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    self.drawMap = function () {
      MapService.getLocations();
    }


    self.addLocation = function (username, group) {
      // console.log('addLocation hit');
      // console.log('newPin line 49 is', newPin);

      if (newPin.group != undefined) {
        // console.log('add location if hit line 52');

        self.updateLocation(newPin.username, newPin.group)

      } else {
        function success(pos) {
          // console.log('add location else hit line 54');

          // if (username) {
          newPin.username = username;
          // } else { newPin.username = "blank username" };
          newPin.location = [pos.coords.latitude, pos.coords.longitude];
          // if (group) {
          newPin.group = group;
          // } else {
          //   newPin.group = "blank group"
          // };
          newPin.speed = pos.coords.speed;
          // console.log('pos is ', pos);
          // console.log('newPin is ', newPin);}
          self.sendObject(newPin);
          setTimer(function(){console.log('add timer started')});

        }


      };

      navigator.geolocation.getCurrentPosition(success, error, options);
      $location.path("map");

    }

    self.updateLocation = function (username, group) {
      // console.log('updateLocation hit');

      function success(pos) {
        changePin.location = [pos.coords.latitude, pos.coords.longitude];
        self.sendUpdate(changePin);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);

      setTimer(function(){console.log('update timer started')});

    }

    self.deletePin = function (username, group) {
      // console.log('deleteLocation hit');
      clearTimeout(timer);
      MapService.deletePin();
      $location.path("");
    }

    self.sendObject = function (newPin) {
      // console.log('sendObject hit');

      MapService.addPin(newPin)

    }

    self.sendUpdate = function (changePin) {
      // console.log('sendUpdate hit');

      MapService.updatePin(changePin)
    }


  }]);
