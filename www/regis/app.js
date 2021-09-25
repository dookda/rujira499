let sendRegis = () => {
    let obj = {
        uname: $("#uname").val(),
        pass: $("#pass").val()
    }

    axios.post("/api/register", obj).then(r => {
        console.log(r);
        if (r !== 0) {
            window.open('../login/logincliant.html', '_self');
        }
    })

    console.log(obj);
}

let sendRegisdri = () => {
    let obj = {
        usname: $("#usname").val(),
        passw: $("#passw").val(),
        driver: $("#driver").val(),
        car: $("#car").val(),
        lat: 18.788544114440448,
        lng: 98.96331759287074
    }

    axios.post("/api/registerdri", obj).then(r => {
        console.log(r);
        if (r !== 0) {
            window.open('../login/loginadmin.html', '_self');
        }
    })

    console.log(obj);
}