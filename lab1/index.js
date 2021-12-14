const { readFileSync, writeFileSync } = require("fs")
const { splitByN } = require("../utils")

// Decode the main task
const mainEncoded = readFileSync("main_encoded.txt", "utf8")
const mainDecoded = Buffer.from(
    splitByN(8, mainEncoded)
        .reduce((acc, value) => acc += String.fromCharCode(parseInt(value, 2)) , ""), 
    "base64"
).toString("utf8")

writeFileSync("main_decoded.txt", mainDecoded)


