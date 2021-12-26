import { argon2id } from "argon2"

export default () => ({
    auth: {
        argon: {
            type: argon2id,
            memory: process.env.ARGON_MEMORY,
            time: process.env.ARGON_TIME,
            parallelism: process.env.ARGON_PARALLELISM,
            secret: Buffer.from(process.env.ARGON_SECRET),
        },
    },
})
