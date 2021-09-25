let map;
let marker;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 18.788612863190146, lng: 98.96330276720951 },
        zoom: 14,
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            // console.log(pos);
            let = lat = pos.coords.latitude;
            let = lng = pos.coords.longitude;
            $("#lat").val(lat)
            $("#lng").val(lng)
            // console.log(lat, lng);
            new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
            });
        });
    }
}


function sendData() {
    var name = $("#name").val();
    let lat = $("#lat").val();
    let lng = $("#lng").val();

    localStorage.setItem('name', name);
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);

    console.log(name, lat, lng);
    alert("ส่งข้อมูลแล้ว")
}
