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
            <span>หมายเลขพัสดุ: ${i.track}</span>
            <p></p>
            <small>${i.username}</small>   
            <p></p>
               <div class="col-auto d-flex justify-content-end px-3"><a href="../form_map/index.html" class="btn btn-dark">ติดตามพัสดุ</a></div> 
            </div>
        </div>`)
        })

    })
}
getfollowdri()