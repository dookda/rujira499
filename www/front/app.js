
let searchData = () => {
    let keyword = $("#search").val()
    // console.log(keyword)

    axios.get("http://localhost:3100/api/select/" + keyword).then(r => {
        $("#person-items").empty();
        r.data.data.map(i => {
            $("#person-items").append(`
            <a href="#" class="list-group-item list-group-item-action"
                onclick="collectData('${i.username}','${i.track}',${i.lat},${i.lng},${i.distance},${i.gid})">
                หมายเลขพัสดุ: ${i.track}</span>
                <small>${i.username}</small>
            </a>
            `)
        })
    })
}
searchData()

let dataArr = [];
let waypts = [];

let collectData = (username, track, lat, lng, distance, gid) => {
    dataArr.push({ username, track, lat, lng, distance, gid })
    waypts.push({
        location: new google.maps.LatLng(lat, lng),
        stopover: true
    })

    dataArr = [...new Map(dataArr.map(obj => [JSON.stringify(obj), obj])).values()];
    waypts = [...new Map(waypts.map(obj => [JSON.stringify(obj), obj])).values()];

    $("#selected-items").empty()
    dataArr.map(i => {
        $("#selected-items").append(`
                <span class="f-warning">${i.track}</span>
            `)
    })
}

let clearItems = () => {
    dataArr = [];
    waypts = [];
    $("#selected-items").empty()
}

let map;
function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 18.830333763738974, lng: 99.04374121323065 },
    });

    directionsRenderer.setMap(map);
    document.getElementById("btnDirection").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });

    // calculateAndDisplayRoute(directionsService, directionsRenderer);
}



let calculateAndDisplayRoute = (directionsService, directionsRenderer) => {

    var start = new google.maps.LatLng(18.830333763738974, 99.04374121323065);
    var end = new google.maps.LatLng(18.831587535866916, 98.97738919262795);

    directionsService.route({
        origin: start,
        destination: start,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
    }).then((response) => {
        directionsRenderer.setDirections(response);
        // console.log(response);
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");

        summaryPanel.innerHTML = "";


        for (let i = 0; i < route.legs.length - 1; i++) {

            dataArr[route.waypoint_order[i]].distance = route.legs[i].distance.value;
            dataArr[route.waypoint_order[i]].order = i;

            console.log(route.waypoint_order[i], route.legs[i].distance.value);
        }

        // console.log(dataArr);
        setTimeout(() => {
            showOrder(dataArr)
        }, 500)

    }).catch((e) => console.log(e));
}

let showOrder = (dat) => {
    dat.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))

    $("#directions-panel").empty()
    dat.map((i) => {
        // console.log(i);
        $("#directions-panel").append(`
           <div class="cursor mb-1" onclick="zoomTo(${i.lat},${i.lng})"> 
            ลำดับ ${i.order}. <span class="f-warning">${i.track}</span> ${i.username} <span class="f-info">${(i.distance / 1000).toFixed(2)} กม.<span>
           </div>
        `)
    })
}

let zoomTo = (lat, lng) => {
    var marker = new google.maps.Marker({
        // map: map,
        position: new google.maps.LatLng(lat, lng)
    });

    map.setZoom(15);
    map.panTo(marker.position);
}


let startTracking = () => {
    let i = 0;
    let driver = "sakda";
    setInterval(() => {
        i += 1;

        navigator.geolocation.getCurrentPosition((e) => {
            console.log(e);
            axios.get(`http://localhost:3100/api/sendlatlng/${driver}/${e.coords.latitude}/${e.coords.longitude}`).then(r => {
                console.log(r.data);
            })
        })
    }, 5000)
}

