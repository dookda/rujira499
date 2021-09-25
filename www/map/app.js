
let searchData = () => {
    let keyword = $("#search").val()
    // console.log(keyword);

    axios.get("http://localhost:3100/api/select/" + keyword).then(r => {
        $("#person-items").empty();
        // console.log();
        r.data.data.map(i => {

            $("#person-items").append(`
            <a href="#" class="list-group-item list-group-item-action"
                onclick="collectData('${i.username}','${i.track}',${i.lat},${i.lng},${i.distance},${i.gid})"><span>
                หมายเลขพัสดุ: ${i.track}</span>                        
                <small>${i.username}</small>
                <p></p>
                <div class="col-sm-12 d-flex flex-row-reverse"><button type="button" class="btn btn-dark" onclick="collectData('${i.username}','${i.track}', ${i.lat}, ${i.lng}, ${i.distance}, ${i.gid})">
                <small>เลือก</small></button></div>
            </a>
            `)
            //         $("#person-items").append(`
            //     <div class="card" mt-3>
            //     <div class="card-body">
            //         <div class="row">
            //             <div class="col-sm-3">${i.username}</div>
            //             <div class="col-sm-3"><span class="badge bg-warning text-dark">หมายเลขพัสดุ; ${i.track}</span></div>
            //             <div class="col-sm-3"><span class="badge bg-danger">${i.distance / 1000} กิโลเมตร</span></div>
            // <div class="col-sm-3"><button type="button" class="btn btn-dark" onclick="collectData('${i.username}','${i.track}', ${i.lat}, ${i.lng}, ${i.distance}, ${i.gid})">
            // เลือก</button></div>
            //             </div>
            //     </div>
            // </div>
            // `)

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
                <span class="btn btn-light">${i.track}</span>
            `)

        // console.log(dataArr);
        //     $("#selected-items").empty();
        //     dataArr.map(i => {

        //         $("#selected-items").append(`
        //     <div class="card" mt-3>
        //     <div class="card-body">
        //         <div class="row">
        //             <div class="col-sm-3">${i.username}</div>
        //             <div class="col-sm-3"><span class="badge bg-warning text-dark">หมายเลขพัสดุ; ${i.track}</span></div>
        //             <div class="col-sm-3"><span class="badge bg-danger">${i.distance / 1000} กิโลเมตร</span></div>
        //         </div>
        //     </div>
        // </div>
        // `)

    })
}

{/* <div class="col-sm-3"><button type="button" class="btn btn-dark" onclick="collectData('${i.username}','${i.track}', ${i.lat}, ${i.lng}, ${i.distance}, ${i.gid})" >แสดงเส้นทาง</button></div> */ }

let clearItems = () => {
    dataArr = [];
    waypts = [];
    $("#selected-items").empty()
}



// let orderMarker = () => {

//     let kerryoffice = { lat: 18.806704546922873, lng: 99.0167239528755 }
//     console.log(dataArr);

//     let distanceArr = []


//     dataArr.map(i => {
//         // console.log(i);

//         let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${kerryoffice.lat},${kerryoffice.lng}&destination=${i.lat},${i.lng}&key=AIzaSyDOPe2IiNLvIfKQc2ceoiIz828Lzc6BU9M`

//         axios.get(url).then((r, index) => {
//             // console.log(r.data.routes[0].legs[0].distance.value);

//             distanceArr.push({
//                 id: index,
//                 val: r.data.routes[0].legs[0].distance.value
//             })
//         })
//     })

//     console.log(distanceArr);
// }

let map;
function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 18.795502760583076, lng: 98.9585661119846 },
    });

    directionsRenderer.setMap(map);
    document.getElementById("btnDirection").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });

    // calculateAndDisplayRoute(directionsService, directionsRenderer);
}


let calculateAndDisplayRoute = (directionsService, directionsRenderer) => {

    var start = new google.maps.LatLng(18.788518808778015, 98.96331939227673);
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
            ลำดับ ${i.order}. <span class="btn btn-light">${i.track}</span> 
            <p></p>
            ${i.username} <span class="text-success">${(i.distance / 1000).toFixed(2)} กม.<span>
            <p></p>
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