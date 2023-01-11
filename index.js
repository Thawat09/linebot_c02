const https = require("https")
const express = require("express")
const app = express()
const passport = require("passport")
const LocalStrategy = require("passport-local")
const PORT = process.env.PORT || 3000
const TOKEN = '9UuuOoemAOcBwMH+8qg7ltt78oDQ13EXMbO6BvDkTST812/gvBvT3iaUQhrG1Jjc3DNjuQ360O2Ivp2k7n74xVrL+wjPGR3YiTa1l7mUWBScKqhZqyMY5SKX9s+Q5KPcgDxnEovactioJHpTRsHiBAdB04t89/1O/w1cDnyilFU='
const User = require("./models/user")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.get("/", (req, res) => {
    res.send('Hello express webhook')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body, null, 2))
    res.send("HTTP POST request sent to the webhook URL!")
    const user_message = req.body.events[0].message.text

    //---------------------------------------------------------------------------//
    if (user_message.split(' ')[0] === "Show") {
        User.find({ 'idMicro': '12345'}, { '_id': 0, 'sensorPin': 1 }).then(function (doc) {
            doc = doc.toString().replace(/[^\d.]/g, '');
            if (doc.length > 0) {
                var body = {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "ESP8266",
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
                                            "text": "Khlong6",
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "Devices",
                                            "color": "#aaaaaa",
                                            "size": "sm",
                                            "flex": 1
                                        },
                                        {
                                            "type": "text",
                                            "text": "DHT22",
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
            if (doc.length > 0) {
                for (var i = 0; i < doc.length; i++) {
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
                                                        "label": "Pin " + doc[0] + '\n',
                                                        "text": doc[0] + '\n'
                                                    }
                                                },
                                                {
                                                    "type": "button",
                                                    "style": "primary",
                                                    "height": "sm",
                                                    "action": {
                                                        "type": "message",
                                                        "label": "Pin " + doc[1] + '\n',
                                                        "text": doc[1] + '\n'
                                                    }
                                                },
                                                {
                                                    "type": "button",
                                                    "style": "primary",
                                                    "height": "sm",
                                                    "action": {
                                                        "type": "message",
                                                        "label": "Pin " + doc[2] + '\n',
                                                        "text": doc[2] + '\n'
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
                                                    "label": "Pin " + doc[0] + '\n',
                                                    "text": doc[0] + '\n'
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "style": "primary",
                                                "height": "sm",
                                                "action": {
                                                    "type": "message",
                                                    "label": "Pin " + doc[1] + '\n',
                                                    "text": doc[1] + '\n'
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
                                                "label": "Pin " + doc[0] + '\n',
                                                "text": doc[0] + '\n'
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
            }
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
        });
    }
    //---------------------------------------------------------------------------//
    else {
        User.find({ 'idline': user_message }, { '_id': 1 }).then(function (doc) {
            console.log(doc + ' 1')
            if (doc.length > 0) {
                let user_id = doc[0]['_id'];
                console.log(user_id + ' 2')
                User.find({ 'user_id': user_id }, {'_id': 0, 'serialnumber': 1 }).then(function (doc1) {
                    let idMicro = doc1[0];
                    idMicro = idMicro.toString().replace(/[^\d.]/g, '');
                    console.log(user_id + ' 3')
                    User.find({ 'idMicro': idMicro }).then(function (doc2) {
                        console.log(doc2 + ' 4')
                    })
                })
            }
            else {
                // Message data, must be stringified
            const dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                    {
                        "type": "text",
                        "text": "Command not found!!!"
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
        })
    }

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})