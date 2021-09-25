const express = require('express')
const app = express()
const { Pool, Client } = require('pg')

const bodyParser = require('body-parser')

app.use(bodyParser.json({
    limit: "50mb",
    extended: true
}))

const port = 3100

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const webhook = require("./webhook");
app.use(webhook)

app.use('/', express.static('www'))

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '1234',
    port: 5432,
})


client.connect()
var sql = `insert into tracking(
    username,
    track,
    lat,
    lng,
    ts)values(
    'e','1454',17.1,17.2,now())
    `




app.get("/api/select", (req, res) => {
    let sql = "SELECT * FROM tracking";
    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.get("/api/select/:keyword", (req, res) => {
    const keyword = req.params.keyword;
    let sql = `SELECT * FROM tracking
    WHERE track like '%${keyword}%'`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


// กรอกแบบฟอร์ม
app.get("/api/add/:username/:track/:lat/:lng/:distance/:duration", (req, res) => {

    const username = req.params.username;
    const track = req.params.track;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const distance = req.params.distance;
    const duration = req.params.duration;
    // console.log(username, track, lat, lng);

    var sql = `insert into tracking(username,track,lat,lng,ts,distance,duration )
    values(
        '${username}','${track}',${lat},${lng},now(),${distance},${duration})
        `;
    client.query(sql).then(r => {
        res.status(200).json({
            data: "คุณส่งข้อมูลสำเร็จ"
        })
    })
})


app.get("/api/sendlatlng/:driver/:lat/:lng", (req, res) => {
    const driver = req.params.driver;
    const lat = req.params.lat;
    const lng = req.params.lng;
    let insertdriver = `INSERT INTO drivertracking(driver)VALUES('${driver}')`
    client.query(insertdriver)
    let sql = `update drivertracking set lat=${lat}, lng=${lng} where driver='${driver}'`


    client.query(sql).then(r => {
        res.status(200).json({
            data: "คุณส่งข้อมูลสำเร็จ"
        })
    })
})





// form_map
app.get("/api/getDriver/:driver/", (req, res) => {
    const driver = req.params.driver;
    let sql = `SELECT * FROM dritable WHERE driver='${driver}'`

    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

// followdriver
app.get("/api/followdri/:username/:track/:driver/:car", (req, res) => {

    const username = req.params.username;
    const track = req.params.track;
    const driver = req.params.driver;
    const car = req.params.car;

    var sql = `insert into followdri(username,track,driver,car)
    values(
        '${username}','${track}','${driver}','${car}')`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: "คุณส่งข้อมูลสำเร็จ"
        })
    })
})


app.get("/api/getfollowdri/:usname", (req, res) => {
    const usname = req.params.usname;
    let sql = `SELECT * FROM followdri WHERE username='${usname}'`

    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


// regiscliant 

app.post("/api/register", (req, res) => {
    const { uname, pass } = req.body;
    let sql = `INSERT INTO usertable (uname, pass, dt)VALUES('${uname}','${pass}',now())`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: "ส่งข้อมูลสำเร็จ"
        })
    })
})


app.get("/api/getuser", (req, res) => {
    // const { uname, pass } = req.body;
    let sql = `SELECT * FROM usertable`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

// logincliant
app.post("/api/login", (req, res) => {
    const { uname, pass } = req.body;
    let sql = `SELECT uname FROM usertable WHERE uname='${uname}' and pass='${pass}'`;
    let token = new Date().getTime()
    client.query(sql).then(r => {

        if (r.rows.length !== 0) {
            res.status(200).json({
                data: r.rows,
                token: token
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})


// regisadmin
app.post("/api/registerdri", (req, res) => {
    const { usname, passw, driver, car, lat, lng } = req.body;
    let sql = `INSERT INTO dritable (usname, passw, driver, car, dt, lat, lng)VALUES('${usname}','${passw}','${driver}','${car}',now(),${lat}, ${lng} )`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: "ส่งข้อมูลสำเร็จ"
        })
    })
})


app.get("/api/getdri", (req, res) => {
    // const { uname, pass } = req.body;
    let sql = `SELECT * FROM dritable`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


// loginadmin
app.post("/api/logindri", (req, res) => {
    const { usname, passw } = req.body;
    let sql = `SELECT usname, car FROM dritable WHERE usname='${usname}' and passw='${passw}'`;
    let token = new Date().getTime()
    client.query(sql).then(r => {

        if (r.rows.length !== 0) {
            res.status(200).json({
                data: r.rows,
                token: token
            })
        } else {
            res.status(200).json({
                data: r.rows
            })
        }
    })
})