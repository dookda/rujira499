const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "test"
})

module.exports = client


const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3100, () => {
    console.log("ok");
})

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/users/:id', (req, res) => {
    client.query(`Select * from users where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();