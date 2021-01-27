let map;
let markers = [];

const houston = { lat: 29.7604, lng: -95.3698 };

function initMap() {
    var mapOptions = {
        zoom: 8,
        center: houston,
        mapTypeId: 'roadmap'
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
    });
    // Add a marker at the center of the map.
    addMarker(houston, map);
};

function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    marker = new google.maps.Marker({
        position: location,
        map: map,
    });

    console.log(location);
    markers.push(marker);
};

// Deletes all markers in the array by removing references to them.
function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


