var token = localStorage.getItem("token");
var uname = localStorage.getItem("uname");
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

let calcRoute = (myLocation) => {
    var start = new google.maps.LatLng(18.788518808778015, 98.96331939227673);

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


let sendData = () => {
    let username = $("#username").val();
    let track = $("#track").val();
    let lat = $("#lat").val();
    let lng = $("#lng").val();
    let distance = $("#distance").val();
    let duration = $("#duration").val();

    // console.log(username, track, lat, lng);

    axios.get(`http://localhost:3100/api/add/${username}/${track}/${lat}/${lng}/${distance}/${duration}`
    ).then(r => {
        console.log(r);
        alert("ส่งข้อมูลสำเร็จ")
        $("#username").val("");
        $("#track").val("");
        $("#lat").val(null);
        $("#lng").val(null);
    })
}
let getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(e => {
            console.log(e);
            let myLoc = new google.maps.LatLng(e.coords.latitude, e.coords.longitude);
            calcRoute(myLoc)
            $("#lat").val(e.coords.latitude);
            $("#lng").val(e.coords.longitude);
        });
    } else {
        console.log("ไม่พบตำแหน่งของท่าน");
    }
}