myApp.service('MapService', ['$http', function ($http) {
  console.log('Map service loaded.');

  var self = this;
  self.locations = [];

  self.getLocations = function () {
    $http.get('/pins').then(function (response) {
      self.locations = response.data;

      console.log('get response: ', self.locations);
    });
  };

  self.addPin = function (newPin) {
    console.log('going to send this object to the server: ', newPin);

    $http.post('/pins', newPin).then(function (response) {
      console.log('service post response: ', response);
      self.getLocations();
    });
  };

  // self.updatePerson = function (currentPerson) {
  //     console.log('service is going to send this object to the server: ', currentPerson);
  //     $http.put('/person/' + currentPerson._id, currentPerson).then(function(response) {
  //         console.log('service update response:', response);
  //         self.getPeople();            
  //     });
  // };

  // self.deletePerson = function(personId) {
  //     console.log('service to delete id: ', personId);

  //     $http.delete('/person/' + personId).then(function (response) {
  //         console.log('service delete response:', response);
  //         self.getPeople();
  //     });

  // }




}]);