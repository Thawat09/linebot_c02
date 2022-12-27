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
    res.send('สวัสดี express webhook')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body, null, 2))
    res.send("HTTP POST request sent to the webhook URL!")

    const user_message = req.body.events[0].message.text
    if (user_message.split(' ')[0] === "On") {
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

    else if (user_message.split(' ')[0] === "Off") {
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

    else if (user_message.split(' ')[0] === "Show") {
        User.find({ 'idMicro': 'A12345' }).exec((err, doc) => {
            var a = ""
            for (let type of doc) {
                a += type
            }
            // Message data, must be stringified
            const dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                    {
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
                            "body": {
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
                                                        "text": "Khlong 6, Pathum Thani, Thailand",
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
                                                        "text": a, //"DHT22"
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
                            },
                            "footer": {
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
                                            "label": "On",
                                            "text": "On"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "Off",
                                            "text": "Off"
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
                        }
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
        });
    }

    else {
        User.find({ 'idMicro': 'A12345' }).exec((err, doc) => {
            var a = ""
            for (let type of doc) {
                a = type
                // Message data, must be stringified
                const dataString = JSON.stringify({
                    replyToken: req.body.events[0].replyToken,
                    messages: [
                        {
                            "type": "text",
                            "text": a + '\n' //"Command not found!!!"
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
        });
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})