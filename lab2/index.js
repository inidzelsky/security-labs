const { writeFileSync, readFileSync } = require("fs")

const encryptedBlocks = readFileSync("encrypted.txt", "utf8").split("\n")

const xorHexBlocks = (block1, block2) => {
    const result = []

    for (const [index, code] of block1.entries()) {
        result.push(code ^ (block2[index] ?? 0))
    }

    return Buffer.from(result)
}

const partlyDecrypted = encryptedBlocks.map(block => {
    const pseudoKey = xorHexBlocks(Buffer.from(encryptedBlocks[0], "hex"), Buffer.from(block, "hex"))
    return xorHexBlocks(Buffer.from("For who would bear the wh"), pseudoKey).toString()
}).join("\n")

writeFileSync("decrypted.txt", partlyDecrypted)