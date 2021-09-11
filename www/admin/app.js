let map;

var directionsService
var directionsRenderer
function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 18.788612863190146, lng: 98.96330276720951 },
        zoom: 14,
    });

    directionsRenderer.setMap(map);

    map.addListener("click", (e) => {
        // console.log();
        let a = e.latLng.toJSON()
        marker = new google.maps.Marker({
            position: a,
            map: map
        })
        // calcRoute(a);
    });

}
let endpoint;

function chkList() {
    let name = localStorage.getItem('name');
    let lat = localStorage.getItem('lat');
    let lng = localStorage.getItem('lng');

    $("#list").val(`${name} (${lat}, ${lng})`)
    endpoint = new google.maps.LatLng(lat, lng)
    // calcRoute(endpoint)
}

let marker;

function calcRoute() {
    var start = new google.maps.LatLng(18.800235566051498, 98.96829343011473);

    var end = endpoint;

    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        console.log(result, status);

        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

