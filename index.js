const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000 //
const TOKEN = '9UuuOoemAOcBwMH+8qg7ltt78oDQ13EXMbO6BvDkTST812/gvBvT3iaUQhrG1Jjc3DNjuQ360O2Ivp2k7n74xVrL+wjPGR3YiTa1l7mUWBScKqhZqyMY5SKX9s+Q5KPcgDxnEovactioJHpTRsHiBAdB04t89/1O/w1cDnyilFU=' // ============= เพิ่มเข้ามาใหม่

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.send('สวัสดี express webhook')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body, null, 2))
    res.send("HTTP POST request sent to the webhook URL!")
    if (req.body.events[0].type === "message") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    "type": "text",
                    "text": "Hello, user"
                },
                {
                    "type": "text",
                    "text": "May I help you?"
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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})