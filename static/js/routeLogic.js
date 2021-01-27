// function calculateRoute() {

//     const katy = { lat: 29.7858, lng: -95.8245 };
//     const houston = { lat: 29.7604, lng: -95.3698 };

//     //code below is for a Route and distance
//     let directionsService = new google.maps.DirectionsService();
//     let directionsRenderer = new google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(map); // Existing map object displays directions
//     // Create route from existing points used for markers
//     const route = {
//         origin: houston,
//         destination: katy,
//         travelMode: 'DRIVING'
//     }

//     directionsService.route(route,
//         function (response, status) { // anonymous function to capture directions
//             if (status !== 'OK') {
//                 window.alert('Directions request failed due to ' + status);
//                 return;
//             } else {
//                 directionsRenderer.setDirections(response); // Add route to the map
//                 var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
//                 if (!directionsData) {
//                     window.alert('Directions request failed');
//                     return;
//                 }
//                 else {
//                     document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
//                 }
//             }
//         })
// }

function createRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 29.7604, lng: -95.3698 },
    });
    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    console.log("in calculateAndDisplayRoute")
    directionsService.route(
        {
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}
