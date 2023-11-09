// location.js

let map;
let marker;

function initializeMap() {
  map = L.map("map").setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

function centerMap(latitude, longitude) {
  map.setView([latitude, longitude], 13);
}

function addMarker(latitude, longitude) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([latitude, longitude]).addTo(map);
}

function shareLocation() {
  initializeMap();

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;

      // Call functions from location.js to center the map and add a marker
      centerMap(latitude, longitude);
      addMarker(latitude, longitude);
    },
    (err) => {
      console.error("Error getting current location:", err);
    }
  );

  return watchId;
}

function stopSharingLocation(watchId) {
  navigator.geolocation.clearWatch(watchId);
}
