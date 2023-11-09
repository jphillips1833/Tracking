// location.js

let map;
let marker;

function initializeMap() {
  // Check if the map container exists in the DOM
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error("Map container not found in the DOM.");
    return;
  }

  map = L.map(mapContainer).setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

function centerMap(latitude, longitude) {
  if (!map) {
    console.error("Map not initialized.");
    return;
  }
  map.setView([latitude, longitude], 13);
}

function addMarker(latitude, longitude) {
  if (!map) {
    console.error("Map not initialized.");
    return;
  }

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
