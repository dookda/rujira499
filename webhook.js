const express = require('express');
const app = express.Router();

const line = require("@line/bot-sdk");
const middleware = require("@line/bot-sdk").middleware;
const e = require('express');

const config = {
    channelAccessToken: 'yrbacigBfOJk7pCkiDQnu+/jlV7bsoX1x2maX9gTv+yS3VGp96oEHgVslvlIu8hBasdv8CvOaG5eOyyC4A6mG2XIFP4NUUzG5L3LcXw8Ko51+ooMCOYt8yePsbGTNmbUQLVxgyAXVR4kjGec6WM5LgdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'e19880287fd8762da7ea401ed1c5a9ee'
};

const client = new line.Client(config)


app.post("/webhook", line.middleware(config), (req, res) => {
    // console.log(e)


    let e = req.body.events[0];

    console.log(e.message)

    if (e.message.type === 'text') {
        return client.replyMessage(e.replyToken, {
            type: 'text',
            text: "hey"
        })
    }
    res.sendStatus(200)
});



module.exports = app;
