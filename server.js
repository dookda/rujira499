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



app.get("/api/select/", (req, res) => {
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


app.get("/api/add/:username/:track/:lat/:lng/:distance/:duration", (req, res) => {
    const username = req.params.username;
    const track = req.params.track;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const distance = req.params.distance;
    const duration = req.params.duration;
    var sql = `INSERT INTO tracking (username,track,lat,lng,ts,distance,duration
            )VALUES(
                '${username}', 
                '${track}', 
                ${lat}, 
                ${lng}, 
                now(),
                ${distance}, 
                ${duration}
            )`;
    client.query(sql).then(r => {
        res.status(200).json({
            data: "ส่งข้อมูลสำเร็จ"
        })
    })
})

