const { writeFile } = require("fs/promises")
const { randomizer } = require("./utils")
const topUsedPasswords = require("./topUsedPasswords")
const commonPasswords = require("./commonPasswords")
const { argonHash, shaHash } = require("./hash")

const passwordGenerator = length => {
    const min = 33
    const max = 122

    let password = ""

    for (let i = 0; i < length; i++) {
        password += String.fromCharCode(randomizer(min, max))
    }

    return password
}

const genMethodsDistribution = {
    ["topUsed"]: {
        min: 0,
        max: 9,
    },
    ["mostCommon"]: {
        min: 10,
        max: 59
    },
    ["random"]: {
        min: 60,
        max: 64
    },
    ["subs"]: {
        min: 65,
        max: 100,
    }
}

const genMethods = {
    ["topUsed"]: () => {
        const passwordIndex = randomizer(0, topUsedPasswords.length)
        return topUsedPasswords[passwordIndex]
    },
    ["mostCommon"]: () => {
        const passwordIndex = randomizer(0, commonPasswords.length)
        return commonPasswords[passwordIndex]
    },
    ["random"]: () => passwordGenerator(randomizer(8, 10)),
    ["subs"]() {
        const substitutionTable = {
            "e": "3",
            "o": "0",
            "i": 1,
        }

        // Get 2 passwords and accomplish substitution
        const [firstPassword, secondPassword] = [this["mostCommon"](), this["topUsed"]()]
            .map(password => Object.entries(substitutionTable)
                .reduce((result, [key, value]) => result.replace(new RegExp(key, "i"), value), password))

        const [firstLength, secondLength] = [firstPassword.length, secondPassword.length]

        // Mix passwords
        return (
            firstPassword.slice(0, Math.floor(firstLength / 2)) +
            secondPassword.slice(0, Math.floor(secondLength / 2)) +
            secondPassword.slice(Math.floor(secondLength / 2), secondLength) +
            firstPassword.slice(Math.floor(firstLength / 2), firstLength)
        )
    },
}

const collectPasswordsList = listLength => {
    const passwordsList = []

    for (let i = 0; i < listLength; i++) {
        const randomPercent = randomizer(0, 100)
        const [genMethodKey] = Object.entries(genMethodsDistribution)
            .find(([_, { min, max }]) => randomPercent >= min && randomPercent <= max)
        
        passwordsList.push(genMethods[genMethodKey]())
    }

    return passwordsList
}

const createArgonPasswordHashes = async listLength => {
    const argonPasswords = collectPasswordsList(listLength)
    const argonHashes = await Promise.all(argonPasswords.map(password => argonHash(Buffer.from(password))))
    await writeFile("../files/strong-hashes.csv", argonHashes.join("\n"))
}

const createShaHashes = async listLength => {
    const shaPasswords = collectPasswordsList(listLength)
    const shaHashes = await Promise.all(shaPasswords.map(password => shaHash(password)))
    await writeFile("../files/weak-hashes.csv", shaHashes.map(({ hashed, salt }) => `${hashed},${salt}`).join("\n"))
}

(async () => {
    const passwordsListLength = 100
    await Promise.all([createArgonPasswordHashes(passwordsListLength), createShaHashes(passwordsListLength)])
})()