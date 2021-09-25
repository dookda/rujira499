let sendlogin = () => {
    let obj = {
        uname: $("#uname").val(),
        pass: $("#pass").val()
    }

    axios.post("/api/login", obj).then(r => {
        console.log(r.data);
        if (r.data.data.length !== 0) {
            localStorage.setItem("token", r.data.token);
            localStorage.setItem("uname", r.data.data[0].uname);
            window.open('../form/index.html', '_self');
        } else {
            alert("username หรือ password ไม่ถูกต้อง")
        }
    })
}



let sendlogindri = () => {
    let obj = {
        usname: $("#usname").val(),
        passw: $("#passw").val(),
    }

    axios.post("/api/logindri", obj).then(r => {
        console.log(r.data);
        if (r.data.data.length !== 0) {
            localStorage.setItem("token", r.data.token);
            localStorage.setItem("usname", r.data.data[0].usname);
            localStorage.setItem("car", r.data.data[0].car);
            window.open('../front/index.html', '_self');
        } else {
            alert("username หรือ password ไม่ถูกต้อง")
        }
    })
}