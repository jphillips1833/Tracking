const map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let marker;
const shareLocationBtn = document.getElementById("shareLocation");
shareLocationBtn.addEventListener("click", shareMyLocation);

function shareMyLocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;

      // Generate a link with the current coordinates
      const shareLink = `https://jphillips1833.github.io/Tracking/view_location.html?lat=${latitude}&lng=${longitude}`;

      // Log the link to the console (you can copy and share this link)
      console.log(`${shareLink}`);

      const shareLinkA = document.createElement("a");
      let shareLinkText = document.createElement("p");
      shareLinkA.href = shareLink;
      shareLinkA.target = "_blank"; // Opens the link in a new tab
      shareLinkText.innerHTML = "view location";
      document.getElementById("linkContainer").appendChild(shareLinkA);
      shareLinkA.appendChild(shareLinkText);

      // Center the map on the shared location
      map.setView([latitude, longitude], 13);

      // Add a marker for the shared location
      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker([latitude, longitude]).addTo(map);
    },
    (err) => {
      console.error("Error getting current location:", err);
    }
  );
}
