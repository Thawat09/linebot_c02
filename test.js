let data = {
    "messages": [{
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
                "type": "box", "layout": "vertical"
                , "contents": [{
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
                    "contents": [{
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [{
                            "type": "text",
                            "text": "Details",
                            "color": "#aaaaaa",
                            "size": "sm", "flex": 1
                        },
                        {
                            "type": "text",
                            "text": "Khlong 6, Pathum Thani, Thailand",
                            "wrap": true,
                            "color": "#666666",
                            "size": "sm", "flex": 5
                        }]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [{
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
                        }]
                    }
                    ]
                }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [{
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
                }],
                "flex": 0
            }
        }
    }]
}