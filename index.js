const https = require("https")
const express = require("express")
const app = express()
const passport = require("passport")
const LocalStrategy = require("passport-local")
const PORT = process.env.PORT || 3000
const TOKEN = '9UuuOoemAOcBwMH+8qg7ltt78oDQ13EXMbO6BvDkTST812/gvBvT3iaUQhrG1Jjc3DNjuQ360O2Ivp2k7n74xVrL+wjPGR3YiTa1l7mUWBScKqhZqyMY5SKX9s+Q5KPcgDxnEovactioJHpTRsHiBAdB04t89/1O/w1cDnyilFU='
const User = require("./models/user")
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.165.213'); //mqtt://broker.hivemq.com //mqtt://192.168.165.213

client.on('connect', () => {
    console.log('Client connected');
});

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

let user_id, _idMicro, idSerial, namesensor, status, color, status1, color1 = ""
let mysort = { '_id': -1 };

app.get("/", (req, res) => {
    res.send('Hello express webhook')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body, null, 2))
    res.send("HTTP POST request sent to the webhook URL!")
    const user_message = req.body.events[0]?.message.text

    //---------------------------------------------------------------------------//
    if (user_message?.split(' ')[0] === "Login") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "text",
                    "text": "Enter ID Line to login.!!!"
                }
            ]
        })
        // Request header
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }
        // Options to pass into the request
        const webhookOptions = {
            "hostname": "api.line.me",
            "path": "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }
        // Define request
        const request = https.request(webhookOptions, (res) => {
            res.on("data", (d) => {
                process.stdout.write(d)
            })
        })
        // Handle error
        request.on("error", (err) => {
            console.error(err)
        })
        // Send data
        request.write(dataString)
        request.end()
    }

    //---------------------------------------------------------------------------//
    else if (user_message?.split(' ')[0] === "true1") {
        let value = "true"
        client.publish('relay1', value);
        let data = ({ $and: [{ 'namesensor': namesensor, 'idMicro': idSerial }] }, { $set: { 'onoff1': value } })
        User.findByIdAndUpdate(_idMicro, data).exec(
            (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    // Message data, must be stringified
                    const dataString = JSON.stringify({
                        replyToken: req.body.events[0].replyToken,
                        messages: [
                            {
                                "type": "text",
                                "text": "The selected device is turned on.!!!"
                            }
                        ]
                    })
                    // Request header
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + TOKEN
                    }
                    // Options to pass into the request
                    const webhookOptions = {
                        "hostname": "api.line.me",
                        "path": "/v2/bot/message/reply",
                        "method": "POST",
                        "headers": headers,
                        "body": dataString
                    }
                    // Define request
                    const request = https.request(webhookOptions, (res) => {
                        res.on("data", (d) => {
                            process.stdout.write(d)
                        })
                    })
                    // Handle error
                    request.on("error", (err) => {
                        console.error(err)
                    })
                    // Send data
                    request.write(dataString)
                    request.end()
                }
            }
        );
    }

    //---------------------------------------------------------------------------//
    else if (user_message?.split(' ')[0] === "true2") {
        let value = "true"
        client.publish('relay2', value);
        let data = ({ $and: [{ 'namesensor': namesensor, 'idMicro': idSerial }] }, { $set: { 'onoff2': value } })
        User.findByIdAndUpdate(_idMicro, data).exec(
            (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    // Message data, must be stringified
                    const dataString = JSON.stringify({
                        replyToken: req.body.events[0].replyToken,
                        messages: [
                            {
                                "type": "text",
                                "text": "The selected device is turned on.!!!"
                            }
                        ]
                    })
                    // Request header
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + TOKEN
                    }
                    // Options to pass into the request
                    const webhookOptions = {
                        "hostname": "api.line.me",
                        "path": "/v2/bot/message/reply",
                        "method": "POST",
                        "headers": headers,
                        "body": dataString
                    }
                    // Define request
                    const request = https.request(webhookOptions, (res) => {
                        res.on("data", (d) => {
                            process.stdout.write(d)
                        })
                    })
                    // Handle error
                    request.on("error", (err) => {
                        console.error(err)
                    })
                    // Send data
                    request.write(dataString)
                    request.end()
                }
            }
        );
    }

    //---------------------------------------------------------------------------//
    else if (user_message?.split(' ')[0] === "false1") {
        let value = "false"
        client.publish('relay1', value);
        let data = ({ $and: [{ 'namesensor': namesensor, 'idMicro': idSerial }] }, { $set: { 'onoff1': value } })
        User.findByIdAndUpdate(_idMicro, data).exec(
            (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    // Message data, must be stringified
                    const dataString = JSON.stringify({
                        replyToken: req.body.events[0].replyToken,
                        messages: [
                            {
                                "type": "text",
                                "text": "The selected device is turned off.!!!"
                            }
                        ]
                    })
                    // Request header
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + TOKEN
                    }
                    // Options to pass into the request
                    const webhookOptions = {
                        "hostname": "api.line.me",
                        "path": "/v2/bot/message/reply",
                        "method": "POST",
                        "headers": headers,
                        "body": dataString
                    }
                    // Define request
                    const request = https.request(webhookOptions, (res) => {
                        res.on("data", (d) => {
                            process.stdout.write(d)
                        })
                    })
                    // Handle error
                    request.on("error", (err) => {
                        console.error(err)
                    })
                    // Send data
                    request.write(dataString)
                    request.end()
                }
            }
        );
    }

    //---------------------------------------------------------------------------//
    else if (user_message?.split(' ')[0] === "false2") {
        let value = "false"
        client.publish('relay2', value);
        let data = ({ $and: [{ 'namesensor': namesensor, 'idMicro': idSerial }] }, { $set: { 'onoff2': value } })
        User.findByIdAndUpdate(_idMicro, data).exec(
            (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    // Message data, must be stringified
                    const dataString = JSON.stringify({
                        replyToken: req.body.events[0].replyToken,
                        messages: [
                            {
                                "type": "text",
                                "text": "The selected device is turned off.!!!"
                            }
                        ]
                    })
                    // Request header
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + TOKEN
                    }
                    // Options to pass into the request
                    const webhookOptions = {
                        "hostname": "api.line.me",
                        "path": "/v2/bot/message/reply",
                        "method": "POST",
                        "headers": headers,
                        "body": dataString
                    }
                    // Define request
                    const request = https.request(webhookOptions, (res) => {
                        res.on("data", (d) => {
                            process.stdout.write(d)
                        })
                    })
                    // Handle error
                    request.on("error", (err) => {
                        console.error(err)
                    })
                    // Send data
                    request.write(dataString)
                    request.end()
                }
            }
        );
    }

    //---------------------------------------------------------------------------//
    else {
        if (user_message) {
            User.find({ 'idline': user_message }, { '_id': 1 }).then(function (doc) {
                if (doc.length > 0) {
                    user_id = doc.map((value) => value._id);
                    User.find({ 'user_id': user_id }, { '_id': 0, 'serialnumber': 1 }).then(function (doc1) {
                        User.find({ 'user_id': user_id }, { '_id': 0, 'namemicrocontroller': 1 }).then(function (doc2) {
                            if (doc1.length > 0) {
                                for (let i = 0; i < doc1.length; i++) {
                                    doc1[i] = doc1[i].toString().replace(/[^\d.]/g, '');
                                    if (doc1.length > 0) {
                                        if (doc1.length > 1) {
                                            if (doc1.length > 2) {
                                                if (doc.length > 3) {
                                                }
                                                else {
                                                    var footer = (
                                                        {
                                                            "type": "box",
                                                            "layout": "vertical",
                                                            "spacing": "sm",
                                                            "contents": [
                                                                {
                                                                    "type": "button",
                                                                    "style": "primary",
                                                                    "height": "sm",
                                                                    "action": {
                                                                        "type": "message",
                                                                        "label": "Serial " + doc[0] + '\n',
                                                                        "text": doc[0]
                                                                    }
                                                                },
                                                                {
                                                                    "type": "button",
                                                                    "style": "primary",
                                                                    "height": "sm",
                                                                    "action": {
                                                                        "type": "message",
                                                                        "label": "Serial " + doc[1] + '\n',
                                                                        "text": doc[1]
                                                                    }
                                                                },
                                                                {
                                                                    "type": "button",
                                                                    "style": "primary",
                                                                    "height": "sm",
                                                                    "action": {
                                                                        "type": "message",
                                                                        "label": "Serial " + doc[2] + '\n',
                                                                        "text": doc[2]
                                                                    }
                                                                },
                                                                {
                                                                    "type": "box",
                                                                    "layout": "vertical",
                                                                    "contents": [],
                                                                    "margin": "sm"
                                                                }
                                                            ],
                                                            "flex": 0
                                                        }
                                                    )
                                                }
                                            }
                                            else {
                                                var footer = (
                                                    {
                                                        "type": "box",
                                                        "layout": "vertical",
                                                        "spacing": "sm",
                                                        "contents": [
                                                            {
                                                                "type": "button",
                                                                "style": "primary",
                                                                "height": "sm",
                                                                "action": {
                                                                    "type": "message",
                                                                    "label": "Serial " + doc1[0] + '\n',
                                                                    "text": doc1[0]
                                                                }
                                                            },
                                                            {
                                                                "type": "button",
                                                                "style": "primary",
                                                                "height": "sm",
                                                                "action": {
                                                                    "type": "message",
                                                                    "label": "Serial " + doc1[1] + '\n',
                                                                    "text": doc1[1]
                                                                }
                                                            },
                                                            {
                                                                "type": "box",
                                                                "layout": "vertical",
                                                                "contents": [],
                                                                "margin": "sm"
                                                            }
                                                        ],
                                                        "flex": 0
                                                    }
                                                )
                                            }
                                        }
                                        else {
                                            var footer = (
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "spacing": "sm",
                                                    "contents": [
                                                        {
                                                            "type": "button",
                                                            "style": "primary",
                                                            "height": "sm",
                                                            "action": {
                                                                "type": "message",
                                                                "label": "Serial " + doc1[0] + '\n',
                                                                "text": doc1[0]
                                                            }
                                                        },
                                                        {
                                                            "type": "box",
                                                            "layout": "vertical",
                                                            "contents": [],
                                                            "margin": "sm"
                                                        }
                                                    ],
                                                    "flex": 0
                                                }
                                            )
                                        }
                                    }
                                    else {
                                        var footer = (
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "box",
                                                        "layout": "vertical",
                                                        "contents": [],
                                                        "margin": "sm"
                                                    }
                                                ],
                                                "flex": 0
                                            }
                                        )
                                    }
                                }
                                if (doc.length > 0) {
                                    var body = {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [
                                            {
                                                "type": "text",
                                                "text": "Microcontroller",
                                                "weight": "bold",
                                                "size": "xl"
                                            },
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "margin": "lg",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "box",
                                                        "layout": "baseline",
                                                        "spacing": "sm",
                                                        "contents": [
                                                            {
                                                                "type": "text",
                                                                "text": "Details",
                                                                "color": "#aaaaaa",
                                                                "size": "sm",
                                                                "flex": 1
                                                            },
                                                            {
                                                                "type": "text",
                                                                "text": doc2[0]?.namemicrocontroller,
                                                                "wrap": true,
                                                                "color": "#666666",
                                                                "size": "sm",
                                                                "flex": 5
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                }
                                if (doc.length > 0) {
                                    var header = {
                                        "type": "flex",
                                        "altText": "Flex Message",
                                        "contents": {
                                            "type": "bubble",
                                            "hero": {
                                                "type": "image",
                                                "url": "https://miro.medium.com/max/1024/1*Yu0w5T7AWg8WqjVFXwaQPg.jpeg",
                                                "size": "full",
                                                "aspectRatio": "20:13",
                                                "aspectMode": "cover",
                                                "action": {
                                                    "type": "uri",
                                                    "uri": "http://linecorp.com/"
                                                }
                                            },
                                            body,
                                            footer,
                                        }
                                    }
                                }
                                if (doc.length === 0) {
                                    var header = {
                                        "type": "text",
                                        "text": "no information found.!!!"
                                    }
                                }
                                // Message data, must be stringified
                                const dataString = JSON.stringify({
                                    replyToken: req.body.events[0].replyToken,
                                    messages: [
                                        header
                                    ]
                                })
                                // Request header
                                const headers = {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + TOKEN
                                }
                                // Options to pass into the request
                                const webhookOptions = {
                                    "hostname": "api.line.me",
                                    "path": "/v2/bot/message/reply",
                                    "method": "POST",
                                    "headers": headers,
                                    "body": dataString
                                }
                                // Define request
                                const request = https.request(webhookOptions, (res) => {
                                    res.on("data", (d) => {
                                        process.stdout.write(d)
                                    })
                                })
                                // Handle error
                                request.on("error", (err) => {
                                    console.error(err)
                                })
                                // Send data
                                request.write(dataString)
                                request.end()
                            }
                            return
                        })
                    })
                }
                return
            })
        }
        if (user_message) {
            User.find({ 'idMicro': user_message }, { '_id': 0, 'namesensor': 1 }).then(function (doc) {
                if (doc.length > 0) {
                    idSerial = req.body.events[0].message.text
                    doc = doc.map((value) => value.namesensor)
                    idSerial = req.body.events[0].message.text
                    for (let i = 0; i < doc.length; i++) {
                        if (doc.length > 0) {
                            if (doc.length > 1) {
                                if (doc.length > 2) {
                                    if (doc.length > 3) {
                                    }
                                    else {
                                        var footer = (
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "button",
                                                        "style": "primary",
                                                        "height": "sm",
                                                        "action": {
                                                            "type": "message",
                                                            "label": doc[0] + '\n',
                                                            "text": doc[0]
                                                        }
                                                    },
                                                    {
                                                        "type": "button",
                                                        "style": "primary",
                                                        "height": "sm",
                                                        "action": {
                                                            "type": "message",
                                                            "label": doc[1] + '\n',
                                                            "text": doc[1]
                                                        }
                                                    },
                                                    {
                                                        "type": "button",
                                                        "style": "primary",
                                                        "height": "sm",
                                                        "action": {
                                                            "type": "message",
                                                            "label": doc[2] + '\n',
                                                            "text": doc[2]
                                                        }
                                                    },
                                                    {
                                                        "type": "box",
                                                        "layout": "vertical",
                                                        "contents": [],
                                                        "margin": "sm"
                                                    }
                                                ],
                                                "flex": 0
                                            }
                                        )
                                    }
                                }
                                else {
                                    var footer = (
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "spacing": "sm",
                                            "contents": [
                                                {
                                                    "type": "button",
                                                    "style": "primary",
                                                    "height": "sm",
                                                    "action": {
                                                        "type": "message",
                                                        "label": doc[0] + '\n',
                                                        "text": doc[0]
                                                    }
                                                },
                                                {
                                                    "type": "button",
                                                    "style": "primary",
                                                    "height": "sm",
                                                    "action": {
                                                        "type": "message",
                                                        "label": doc[1] + '\n',
                                                        "text": doc[1]
                                                    }
                                                },
                                                {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [],
                                                    "margin": "sm"
                                                }
                                            ],
                                            "flex": 0
                                        }
                                    )
                                }
                            }
                            else {
                                var footer = (
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "button",
                                                "style": "primary",
                                                "height": "sm",
                                                "action": {
                                                    "type": "message",
                                                    "label": doc[0] + '\n',
                                                    "text": doc[0]
                                                }
                                            },
                                            {
                                                "type": "box",
                                                "layout": "vertical",
                                                "contents": [],
                                                "margin": "sm"
                                            }
                                        ],
                                        "flex": 0
                                    }
                                )
                            }
                        }
                        else {
                            var footer = (
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "contents": [],
                                            "margin": "sm"
                                        }
                                    ],
                                    "flex": 0
                                }
                            )
                        }
                    }
                    if (doc.length > 0) {
                        var body = {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Sensor",
                                    "weight": "bold",
                                    "size": "xl"
                                }
                            ]
                        }
                    }
                    if (doc.length > 0) {
                        var header = {
                            "type": "flex",
                            "altText": "Flex Message",
                            "contents": {
                                "type": "bubble",
                                "hero": {
                                    "type": "image",
                                    "url": "https://cdn.shopify.com/s/files/1/0043/7154/6227/products/DHT22_P_f9dd93f5-d1d8-4e36-a2ba-8cef9b5eb60c_1200x1200.jpg?v=1634286203",
                                    "size": "full",
                                    "aspectRatio": "20:13",
                                    "aspectMode": "cover",
                                    "action": {
                                        "type": "uri",
                                        "uri": "http://linecorp.com/"
                                    }
                                },
                                body,
                                footer,
                            }
                        }
                    }
                    if (doc.length === 0) {
                        var header = {
                            "type": "text",
                            "text": "no information found.!!!"
                        }
                    }
                    // Message data, must be stringified
                    const dataString = JSON.stringify({
                        replyToken: req.body.events[0].replyToken,
                        messages: [
                            header
                        ]
                    })
                    // Request header
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + TOKEN
                    }
                    // Options to pass into the request
                    const webhookOptions = {
                        "hostname": "api.line.me",
                        "path": "/v2/bot/message/reply",
                        "method": "POST",
                        "headers": headers,
                        "body": dataString
                    }
                    // Define request
                    const request = https.request(webhookOptions, (res) => {
                        res.on("data", (d) => {
                            process.stdout.write(d)
                        })
                    })
                    // Handle error
                    request.on("error", (err) => {
                        console.error(err)
                    })
                    // Send data
                    request.write(dataString)
                    request.end()
                }
                return
            })
        }
        if (user_id) {
            User.findOne({ $and: [{ 'namesensor': user_message }, { 'idMicro': idSerial }] }, { '_id': 1, 'onoff1': 1, 'onoff2': 1 }).then(function (doc1) {
                _idMicro = doc1?._id
                if (doc1?.onoff1 == true) {
                    status = "On"
                    text = "Off"
                    color = "#0BCD55"
                    color1 = "#FF0000"
                    label = "false1"
                }
                else {
                    status = "Off"
                    text = "On"
                    color = "#FF0000"
                    color1 = "#0BCD55"
                    label = "true1"
                }
                if (doc1?.onoff2 == true) {
                    status1 = "On"
                    text1 = "Off"
                    color2 = "#0BCD55"
                    color3 = "#FF0000"
                    label1 = "false2"
                }
                else {
                    status1 = "Off"
                    text1 = "On"
                    color2 = "#FF0000"
                    color3 = "#0BCD55"
                    label1 = "true2"
                }
                User.findOne({ $and: [{ 'namesensor': user_message }, { 'idSerial': idSerial }] }, { '_id': 0, 'temperature': 1, 'humidity': 1, 'aqi': 1 }).sort(mysort).then(function (doc) {
                    if (doc?.temperature > 0) {
                        namesensor = req.body.events[0].message.text
                        var footer = (
                            {
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://cdn-icons-png.flaticon.com/512/1090/1090683.png",
                                                "size": "md"
                                            },
                                            {
                                                "type": "text",
                                                "text": " Temperature : " + doc?.temperature + "°C",
                                                "size": "md"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://png.pngtree.com/png-vector/20190219/ourlarge/pngtree-vector-humidity-icon-png-image_563949.jpg",
                                                "size": "md"
                                            },
                                            {
                                                "type": "text",
                                                "text": " Humidity : " + doc?.humidity + "%",
                                                "size": "md"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "url": "https://media.istockphoto.com/id/1433126279/vector/abstract-cloud-pm-2-5-for-concept-design-cloud-icon-vector-illustration-stock-image.jpg?b=1&s=170667a&w=0&k=20&c=HddytKGZavZWOfgvdSKw_hNUGnw8XYWrpDtOInNrtt4=",
                                                "size": "md"
                                            },
                                            {
                                                "type": "text",
                                                "text": " PM2.5 : " + doc?.aqi + "AQI",
                                                "size": "md"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "separator",
                                        "margin": "md"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Relay 1 ",
                                        "color": "#000000",
                                        "size": "md",
                                        "weight": "bold",
                                        "align": "center"
                                    },
                                    {
                                        "type": "separator",
                                        "margin": "md"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [],
                                        "margin": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Status : " + status,
                                        "color": color,
                                        "size": "md",
                                        "weight": "bold",
                                        "align": "center"
                                    },
                                    {
                                        "type": "button",
                                        "color": color1,
                                        "style": "primary",
                                        "margin": "md",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": text,
                                            "text": label
                                        },
                                    },
                                    {
                                        "type": "separator",
                                        "margin": "md"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Relay 2 ",
                                        "color": "#000000",
                                        "size": "md",
                                        "weight": "bold",
                                        "align": "center"
                                    },
                                    {
                                        "type": "separator",
                                        "margin": "md"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [],
                                        "margin": "sm"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Status : " + status1,
                                        "color": color2,
                                        "size": "md",
                                        "weight": "bold",
                                        "align": "center"
                                    },
                                    {
                                        "type": "button",
                                        "color": color3,
                                        "style": "primary",
                                        "margin": "md",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": text1,
                                            "text": label1
                                        },
                                    }
                                ],
                                "flex": 0
                            }
                        )
                        var body = {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Weather",
                                    "weight": "bold",
                                    "size": "xl"
                                }
                            ]
                        }
                        var header = {
                            "type": "flex",
                            "altText": "Flex Message",
                            "contents": {
                                "type": "bubble",
                                "hero": {
                                    "type": "image",
                                    "url": "https://img.winnews.tv/files/site/e83631d3ff566f089b23641f0aac5082.jpg",
                                    "size": "full",
                                    "aspectRatio": "20:13",
                                    "aspectMode": "cover",
                                    "action": {
                                        "type": "uri",
                                        "uri": "http://linecorp.com/"
                                    }
                                },
                                body,
                                footer,
                            }
                        }
                        // Message data, must be stringified
                        const dataString = JSON.stringify({
                            replyToken: req.body.events[0].replyToken,
                            messages: [
                                header
                            ]
                        })
                        // Request header
                        const headers = {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + TOKEN
                        }
                        // Options to pass into the request
                        const webhookOptions = {
                            "hostname": "api.line.me",
                            "path": "/v2/bot/message/reply",
                            "method": "POST",
                            "headers": headers,
                            "body": dataString
                        }
                        // Define request
                        const request = https.request(webhookOptions, (res) => {
                            res.on("data", (d) => {
                                process.stdout.write(d)
                            })
                        })
                        // Handle error
                        request.on("error", (err) => {
                            console.error(err)
                        })
                        // Send data
                        request.write(dataString)
                        request.end()
                    }
                })
            })
        }
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})