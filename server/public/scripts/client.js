var myApp = angular.module('myApp', []);

var locations = [{ lat: 44.993125, lng: -93.202571 }, { lat: 44.987305, lng: -93.202786 }, { lat: 44.987802, lng: -93.230248 }, { lat: 44.973732, lng: -93.236986 }, { lat: 44.982838, lng: -93.232165 }, { lat: 44.987873, lng: -93.215255 }];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: locations[4]
  });
  for (var i = 0; i < locations.length; i++) {
    new google.maps.Marker({
      position: locations[i],
      map: map
    });
  }
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, function () { showPosition() });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

function showPosition(position) {
  locations.push({ lat: position.coords.latitude, lng: position.coords.longitude })
  console.log("Latitude: ", position.coords.latitude, "Longitude: ", position.coords.longitude);
  console.log(locations);
  initMap();
}

// initMap();
getLocation();

