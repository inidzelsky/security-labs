const { readFileSync, writeFileSync } = require("fs")
const { splitByN, frequencyAnalysis, calculateCoincidences, slideText } = require("../utils")

// Decode the main task
const mainEncoded = readFileSync("main_encoded.txt", "utf8")
const mainDecoded = Buffer.from(
    splitByN(8, mainEncoded)
        .reduce((acc, value) => acc += String.fromCharCode(parseInt(value, 2)) , ""),
    "base64"
).toString("utf8")

writeFileSync("main_decoded.txt", mainDecoded)

// Decrypt the first part
const firstPartEncrypted = "7958401743454e1756174552475256435e59501a5c524e176f786517545e475f5245191772195019175e4317445f58425b531743565c521756174443455e595017d5b7ab5f525b5b58174058455b53d5b7aa175659531b17505e41525917435f52175c524e175e4417d5b7ab5c524ed5b7aa1b174f584517435f5217515e454443175b524343524517d5b7ab5fd5b7aa17405e435f17d5b7ab5cd5b7aa1b17435f5259174f584517d5b7ab52d5b7aa17405e435f17d5b7ab52d5b7aa1b17435f525917d5b7ab5bd5b7aa17405e435f17d5b7ab4ed5b7aa1b1756595317435f5259174f58451759524f4317545f564517d5b7ab5bd5b7aa17405e435f17d5b7ab5cd5b7aa175650565e591b17435f525917d5b7ab58d5b7aa17405e435f17d5b7ab52d5b7aa1756595317445817585919176e5842175a564e17424452175659175e5953524f1758511754585e59545e53525954521b177f565a5a5e595017535e4443565954521b177c56445e445c5e17524f565a5e5956435e58591b17444356435e44435e54565b17435244434417584517405f564352415245175a52435f5853174e5842175152525b174058425b5317445f584017435f52175552444317455244425b4319"
const firstPartEncryptedFrequency = frequencyAnalysis(firstPartEncrypted, { fragmentLength: 2 })
// console.log(firstPartEncryptedFrequency)

const firstPartDecrypted = Buffer.from(splitByN(2, firstPartEncrypted)
    .map(value => parseInt(value, 16))
    .map(value => value ^ 55)
    .map(value => value.toString(16))
    .join(""), "hex").toString()

writeFileSync("first_part_decrypted.txt", firstPartDecrypted)

// Decrypt the second part
const secondPartEncrypted = Buffer.from("G0IFOFVMLRAPI1QJbEQDbFEYOFEPJxAfI10JbEMFIUAAKRAfOVIfOFkYOUQFI15ML1kcJFUeYhA4IxAeKVQZL1VMOFgJbFMDIUAAKUgFOElMI1ZMOFgFPxADIlVMO1VMO1kAIBAZP1VMI14ANRAZPEAJPlMNP1VMIFUYOFUePxxMP19MOFgJbFsJNUMcLVMJbFkfbF8CIElMfgZNbGQDbFcJOBAYJFkfbF8CKRAeJVcEOBANOUQDIVEYJVMNIFwVbEkDORAbJVwAbEAeI1INLlwVbF4JKVRMOF9MOUMJbEMDIVVMP18eOBADKhALKV4JOFkPbFEAK18eJUQEIRBEO1gFL1hMO18eJ1UIbEQEKRAOKUMYbFwNP0RMNVUNPhlAbEMFIUUALUQJKBANIl4JLVwFIldMI0JMK0INKFkJIkRMKFUfL1UCOB5MH1UeJV8ZP1wVYBAbPlkYKRAFOBAeJVcEOBACI0dAbEkDORAbJVwAbF4JKVRMJURMOF9MKFUPJUAEKUJMOFgJbF4JNERMI14JbFEfbEcJIFxCbHIJLUJMJV5MIVkCKBxMOFgJPlVLPxACIxAfPFEPKUNCbDoEOEQcPwpDY1QDL0NCK18DK1wJYlMDIR8II1MZIVUCOB8IYwEkFQcoIB1ZJUQ1CAMvE1cHOVUuOkYuCkA4eHMJL3c8JWJffHIfDWIAGEA9Y1UIJURTOUMccUMELUIFIlc=", "base64").toString("utf-8")

const oneCharKeyLengthCoincidences = calculateCoincidences(secondPartEncrypted, slideText(1, secondPartEncrypted))
const twoCharsKeyLengthCoincidences = calculateCoincidences(secondPartEncrypted, slideText(2, secondPartEncrypted))
const threeCharsKeyLengthCoincidences = calculateCoincidences(secondPartEncrypted, slideText(1, secondPartEncrypted))

const decryptXorVigenere = (encryptedText, key) => {
    let currentIndex = 0
    let result = ""

    for (const char of encryptedText.split("")) {
        if (currentIndex === key.length) currentIndex = 0
        result += String.fromCharCode(char.charCodeAt() ^ key[currentIndex++].charCodeAt())
    }

    return result
}

const getAppropriateKeyPartChars = (keyLength, text) => {
    const groups = new Array(keyLength).fill("")
    let currentIndex = 0

    for (const char of text) {
        if (currentIndex === keyLength) currentIndex = 0
        groups[currentIndex++] += char
    }

    return groups
}

const guessThreeCharsKey = encryptedText => {
    const possibleVariants = {}
    const cipherRegExp = new RegExp("cipher", "i")

    for (let i = 1; i <= 255; i++) {
        for (let j = 1; j <= 255; j++) {
            for (let k = 1; k <= 255; k++) {
                const key = String.fromCharCode(i) + String.fromCharCode(j) + String.fromCharCode(k)
                const decrypted = decryptXorVisioner(secondPartEncrypted, key)
                if (cipherRegExp.test(decrypted)) possibleVariants[key] = decrypted
            }
        }
    }
}

// const possibleVariants = guessThreeCharsKey(secondPartEncrypted)
const realKey = String.fromCharCode(76) + String.fromCharCode(48) + String.fromCharCode(108)
const secondPartDecrypted = decryptXorVigenere(secondPartEncrypted, realKey)

writeFileSync("second_part_decrypted.txt", secondPartDecrypted)

const thirdPartEncrypted = "EFFPQLEKVTVPCPYFLMVHQLUEWCNVWFYGHYTCETHQEKLPVMSAKSPVPAPVYWMVHQLUSPQLYWLASLFVWPQLMVHQLUPLRPSQLULQESPBLWPCSVRVWFLHLWFLWPUEWFYOTCMQYSLWOYWYETHQEKLPVMSAKSPVPAPVYWHEPPLUWSGYULEMQTLPPLUGUYOLWDTVSQETHQEKLPVPVSMTLEUPQEPCYAMEWWYTYWDLUULTCYWPQLSEOLSVOHTLUYAPVWLYGDALSSVWDPQLNLCKCLRQEASPVILSLEUMQBQVMQCYAHUYKEKTCASLFPYFLMVHQLUPQLHULIVYASHEUEDUEHQBVTTPQLVWFLRYGMYVWMVFLWMLSPVTTBYUNESESADDLSPVYWCYAMEWPUCPYFVIVFLPQLOLSSEDLVWHEUPSKCPQLWAOKLUYGMQEUEMPLUSVWENLCEWFEHHTCGULXALWMCEWETCSVSPYLEMQYGPQLOMEWCYAGVWFEBECPYASLQVDQLUYUFLUGULXALWMCSPEPVSPVMSBVPQPQVSPCHLYGMVHQLUPQLWLRPOEDVMETBYUFBVTTPENLPYPQLWLRPTEKLWZYCKVPTCSTESQPBYMEHVPETCMEHVPETZMEHVPETKTMEHVPETCMEHVPETT"
const subsitution = (encryptedText, subsctitutionTable) => {
    const result = encryptedText.split("").map(char => "\x1b[34m" + char)
    encryptedText.split("").forEach((char, index) => {
        const subsitutionChar = subsctitutionTable[char]
        if (subsitutionChar) {
            result[index] = "\x1b[31m" + subsitutionChar
        }
    })
    return result.join("")
}
const lettersFrequency = console.log(frequencyAnalysis(thirdPartEncrypted))
const bigramsFrequency = console.log(frequencyAnalysis(thirdPartEncrypted, { fragmentLength: 2 }))
const threegramsFrequency = frequencyAnalysis(thirdPartEncrypted, { fragmentLength: 3 })
const thirdPartDecrypted = subsitution(thirdPartEncoded, {
    'L': 'E',
    'P': 'T',
    'Q': 'H',
    'U': 'R',
    'M': 'C',
    'V': 'I',
    'H': 'P',
    'E': 'A',
    'S': 'S',
    'T': 'L',
    'R': 'X',
    'B': 'W',
    'W': 'N',
    'C': 'Y',
    'Y': 'O',
    'A': 'U',
    'K': 'B',
    'F': 'D',
    'D': 'G',
    'G': 'F',
    'I': 'V',
    'N': 'K',
    'O': 'M',
    'X': 'Q',
    'Z': 'J'
})
writeFileSync("third_part_decrypted.txt", thirdPartDecrypted)
