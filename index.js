const fs = require('fs')

fs.mkdirSync('./data', { recursive: true })

const jsonData = { data: [] }


fs.readFile("./data/telegram-messages.json", "utf8", (err, jsonString) => {
    if (err) {
        console.error("Error reading file from disk:", err);
        process.exit(1)
    }
    try {
        const messageJSON = JSON.parse(jsonString);
        messageJSON.messages.forEach((message) => {
            message.text_entities.forEach((text_entity) => {
                let concatenatedString = ""
                if (text_entity.type === "plain") {
                    concatenatedString += text_entity.text
                }
                if (concatenatedString) {
                    jsonData.data.push({
                        text: concatenatedString,
                        date: text_entity.data,
                        from: text_entity.from,
                    })
                }
            })
        })

        fs.writeFile("./data/telegram-messages-array.json", JSON.stringify(jsonData), "utf8", (err) => {
            if (err) {
                console.error("Error write file to disk:", err);
                process.exit(1)
            }
        })
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});