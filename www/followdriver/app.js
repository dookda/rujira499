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



let getfollowdri = () => {
    console.log("getfollowdri");
    axios.get(`/api/getfollowdri/${uname}`
    ).then(r => {
        // console.log(uname);
        r.data.data.map(i => {
            console.log(i);
            $("#item-list").append(`<div class="card">
                <div class="card-body">
                    <div class="col-auto d-flex justify-content-between px-3">
                        <span>หมายเลขพัสดุ: ${i.track}</span> <span>ชื่อผู้ส่ง (driver): ${i.driver}</span> <span>ทะเบียนรถ: ${i.car}</span>  <button  class="btn btn-dark" onclick="gotoMap('${i.driver}')">ติดตามพัสดุ</button>
                    </div> 
                </div>
            </div>`)
        })
    })
}
getfollowdri()

let gotoMap = (d) => {
    // console.log(d);
    localStorage.setItem("driver", d)
    window.open("../form_map/index.html", "_self")
}



