//---------------------------------------------------------------------------//
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

//---------------------------------------------------------------------------//
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