let lat = document.getElementById("lat");
let long = document.getElementById("long");
let error = document.getElementById("error-msg");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      lat.innerHTML = pos.coords.latitude;
      long.innerHTML = pos.coords.longitude;
    });
  } else {
    error.innerHTML = "Your browser does not support geolocator";
  }
}
getLocation();
