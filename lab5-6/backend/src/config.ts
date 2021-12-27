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
    db: {
        pg: {
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            port: parseInt(process.env.PG_PORT) || 5432,
            database: process.env.PG_DATABASE,
        },
    },
    aws: {
        kmsKeyId: process.env.KMS_KEY_ID,
    },
    encryption: {
        algorithm: "aes-256-gcm",
        dataKey: Buffer.from(process.env.DATA_ENCRYPTION_KEY, "base64"),
    },
})
