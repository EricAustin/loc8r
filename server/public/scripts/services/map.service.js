myApp.service('MapService', ['$http', 'NgMap', function ($http, NgMap) {
  // console.log('Map service loaded.');

  var self = this;
  var ID;
  var bounds = new google.maps.LatLngBounds();
  var newPin = {};
  self.locations = { list: [] };

  self.getLocations = function () {
    $http.get('/pins/' + self.newPin.group).then(function (response) {
      // console.log('self.newPin.group is', self.newPin.group);
      self.locations.list = response.data;
      // console.log('get response: ', self.locations);
      self.drawMap();
    })
  }; // end self.getLocations

  self.addPin = function (newPin) {
    // console.log('going to send this object to the server: ', newPin);
    $http.post('/pins', newPin).then(function (response) {
      self.newPin = newPin
      // console.log('service post response.data: ', response.data);
      ID = response.data
      // console.log('self.newID is', self.newID);
      // console.log('MapService.newID is', MapService.newID);
      self.getLocations();
    });
  }; // end self.addPin

  self.updatePin = function (changePin) {
    changePin.ID = ID;
    // console.log('updating pin with ID:', changePin.ID);
    // console.log('new location is:', changePin.location);
    // console.log('new timestamp is', changePin.timestamp);
    $http.put('/pins', changePin).then(function () {
      self.getLocations();
    })
  } // end self.updatePin

  self.deletePin = function () {
    // console.log('service to delete id: ', ID);
    $http.delete('/pins/' + ID).then(function (response) {
      // console.log('service delete response:', response);
      self.getLocations();
    });
  } // end self.deletePin


  self.drawMap = function () {
    // console.log('MapService.locations is', self.locations);
    // console.log('locations is ', self.locations);
    // console.log('self.locations is ', self.locations);
    // console.log('self.locations.list is ', self.locations.list);
    // console.log('self.locations.list.length is ', self.locations.list.length);

    // if (self.locations.list.length == 0) {
    //   // console.log('if hit');
    //   NgMap.getMap().then(function (map) {
    //     map.setCenter({ lat: 47.115567, lng: -101.299663 });
    //     map.setZoom(4);
    //   })
    // } else {
    // console.log('else hit');
    for (var i = 0; i < self.locations.list.length; i++) {
      var latlng = new google.maps.LatLng(self.locations.list[i].location[0], self.locations.list[i].location[1]);
      bounds.extend(latlng);
      // console.log(MapService.locations[i].location[0]);
      // console.log(MapService.locations[i].location[1]);
    }
    NgMap.getMap().then(function (map) {
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    });
    // }
  } // end self.drawMap




}]);