var token = localStorage.getItem("token");
var uname = localStorage.getItem("uname");
var driver = localStorage.getItem("driver")
$("#uname").html(uname)

if (!token) {
    window.open('../login/logincliant.html', '_self')
}

let logout = () => {
    localStorage.clear();
    window.open('../login/logincliant.html', '_self')
}

let map;

var directionsService
var directionsRenderer

function initMap() {

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 18.795502760583076, lng: 98.9585661119846 },
        zoom: 14,
    });

    directionsRenderer.setMap(map);
}

let calcRoute = (myLocation, driverLoc) => {
    var start = driverLoc;

    var end = myLocation;

    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        // console.log();
        $("#distance").val(result.routes[0].legs[0].distance.value)
        $("#duration").val(result.routes[0].legs[0].duration.value)

        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}


let getDriver = () => {

    setInterval(() => {
        axios.get(`/api/getDriver/${driver}`).then(r => {
            console.log(r.data.data[0]);
            getLocation(r.data.data[0].lat, r.data.data[0].lng)
        })
    }, 5000)
}

getDriver()


let getLocation = (lat, lng) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(e => {
            let driverLoc = new google.maps.LatLng(lat, lng);
            let myLoc = new google.maps.LatLng(e.coords.latitude, e.coords.longitude);
            calcRoute(myLoc, driverLoc)
            $("#lat").val(e.coords.latitude);
            $("#lng").val(e.coords.longitude);
        });
    } else {
        console.log("ไม่พบตำแหน่งของท่าน");
    }
}