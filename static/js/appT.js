const APPLICATION_NAME = 'Copyright Krishna Pulipaka';
const APPLICATION_VERSION = '1.0';

tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);


var map = tt.map({
    key: API_KEY,
    container: 'map',
    center: [-95.30256990105522, 29.912460590742466],
    zoom: 8,
    dragPan: true,
    style: 'tomtom://vector/1/basic-main'
});

var trafficFlowConfig = {
    key: API_KEY,
    theme: {
        style: 'relative-delay',
        source: 'vector'
    },
    refresh: 30000
};

var trafficIncientsConfig = {
    key: API_KEY,
    incidentTiles: {
        style: 'tomtom://vector/1/s3'
    },
    incidentDetails: {
        style: 's3'
    }
};

map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

map.on('load', function () {
    map.addTier(new tt.TrafficFlowTilesTier(trafficFlowConfig));
    //map.addTier(new tt.TrafficFlowTilesTier(trafficIncidentsConfig));
});


