const { readFileSync } = require("fs")

const commonPasswords = readFileSync("../files/100k-most-common-passwords.txt", "utf-8").split("\n")

module.exports = commonPasswords
