const { readFileSync, writeFileSync } = require("fs")
const { splitByN } = require("../utils")

const cipheredText = readFileSync("encoded.txt", "utf-8")

writeFileSync(
    "decoded.txt", 
    splitByN(4, cipheredText)
        .map(block => block.split(""))
        .map(block => block[3] + block[0] + block[2] + block[1])
        .join("")
        .replace(/\!/g, " ")
)
