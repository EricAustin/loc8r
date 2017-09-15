myApp.service('MapService', ['$http', 'NgMap', function ($http, NgMap) {
  // console.log('Map service loaded.');

  var self = this;
  var bounds = new google.maps.LatLngBounds();

  self.locations = { list: []};

  self.getLocations = function () {
    $http.get('/pins').then(function (response) {
      self.locations.list = response.data;
      // console.log('get response: ', self.locations);
      self.drawMap();
    })
  };


  self.addPin = function (newPin) {
    console.log('going to send this object to the server: ', newPin);
    $http.post('/pins', newPin).then(function (response) {
      console.log('service post response.data: ', response.data);
      self.newID = response.data
      // console.log('self.newID is', self.newID);
      // console.log('MapService.newID is', MapService.newID);
      self.getLocations();
    });
  };


  self.drawMap = function () {
    // console.log('MapService.locations is', self.locations);
    // console.log('locations is ', self.locations);
    console.log('self.locations is ', self.locations);    
    console.log('self.locations.list is ', self.locations.list);
    
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
  }




}]);