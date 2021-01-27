var markers = [];

map.on('click', function (event) {
    console.log(event)
    var marker = new tt.Marker().setLngLat(event.lngLat).addTo(map);
    markers.push(marker);
});

var clearMarkers = function () {
    for (marker of markers) {
        marker.remove();
    }
    markers = [];
};

// var searchCity = function () {
//     tt.service.fuzzySearch({
//         key: API_KEY,
//         query: document.getElementById("myLocation")
//         //idxSet: PointerEvent,
//         boundingBox: map.getBounds()
//     })
//         .go()
//         .then(handleSearchResults);
// };

var createRoute = function () {
    //create the options
    var routeOptions = {
        key: API_KEY,
        locations: []
    }

    for (marker of markers) {
        routeOptions.locations.push(marker.getLngLat());
        console.log(markers);
    }

    console.log(routeOptions);
    //execute the routing API...
    tt.services.calculateRoute(routeOptions).go().then(
        function (routeData) {
            console.log(routeData);
        }
    )



    // function findFirstBuildingLayerId() {
    //     console.log("in findfirstB")
    //     var layers = map.getStyle().layers;
    //     for (var index in layers) {
    //         if (layers[index].type === 'fill-extrusion') {
    //             return layers[index].id;
    //         }
    //     }
    //     throw new Error('Map style does not contain any layer with fill-extrusion type.');
    // }

    // map.once('load', function () {
    //     tt.services.calculateRoute({
    //         key: API_KEY,
    //         traffic: false,
    //         locations: '4.8786,52.3679:4.8798,52.3679'
    //     })
    //         .go()
    //         .then(function (response) {
    //             var geojson = response.toGeoJson();
    //             map.addLayer({
    //                 'id': 'route',
    //                 'type': 'line',
    //                 'source': {
    //                     'type': 'geojson',
    //                     'data': geojson
    //                 },
    //                 'paint': {
    //                     'line-color': '#4a90e2',
    //                     'line-width': 8
    //                 }
    //             }, findFirstBuildingLayerId());
    //             addMarkers(geojson.features[0]);
    //             var bounds = new tt.LngLatBounds();
    //             geojson.features[0].geometry.coordinates.forEach(function (point) {
    //                 bounds.extend(tt.LngLat.convert(point));
    //             });
    //             map.fitBounds(bounds, { duration: 0, padding: 50 });
    //         });
    // });
}