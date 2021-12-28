const { hash, argon2id } = require("argon2")
const { createHash, randomBytes } = require("crypto")

module.exports = {
    argonHash(data) {
        return hash(data, {
            type: argon2id,
            parallelism: 1,
            memoryCost: 15360,
            timeCost: 2,
            secret: Buffer.from("aboba"),
        })
    },
    
    async shaHash(data) {
        const saltLength = 8
        const salt = Buffer.from(randomBytes(saltLength / 2)
            .toString("hex")
            .slice(0, saltLength))

        const hash = createHash("sha1")
        hash.update(data + salt)
        return {
            hashed: hash.digest("hex"),
            salt,
        }
    }
}
