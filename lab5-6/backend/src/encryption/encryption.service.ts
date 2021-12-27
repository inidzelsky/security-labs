/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from "@nestjs/common"
import { KmsService } from "./kms.service"
import { randomBytes, createCipheriv, createDecipheriv } from "crypto"
import { EncryptionStorageService } from "./encryption-storage.service"

@Injectable()
export class EncryptionService {
    constructor(
        private readonly kmsService: KmsService,
        private readonly encryptionStorageService: EncryptionStorageService,
        private readonly encryptedDataEncryptionKey: Buffer,
        private readonly encryptionAlgorithm: string,
    ) {}

    public async encrypt(recordId: string, rawData: Buffer): Promise<Buffer> {
        const IV: Buffer = randomBytes(12)
        const dataEncryptionKey = await this.kmsService.decrypt(this.encryptedDataEncryptionKey)
        const cipher = createCipheriv(this.encryptionAlgorithm, dataEncryptionKey, IV)

        let encrypted: string = cipher.update(rawData.toString(), "utf8", "hex")
        encrypted += cipher.final("hex")

        //@ts-ignore
        const authTag: Buffer = cipher.getAuthTag()
        this.encryptionStorageService.store({ id: recordId, IV, authTag })

        return Buffer.from(encrypted)
    }

    public async decrypt(recordId: string, encryptedData: Buffer): Promise<Buffer> {
        const encryptionPayload = this.encryptionStorageService.find(recordId)
        if (!encryptionPayload) throw new Error("encryption_payload_not_found")

        const { IV, authTag } = encryptionPayload

        const dataEncryptionKey = await this.kmsService.decrypt(this.encryptedDataEncryptionKey)
        const decipher = createDecipheriv(this.encryptionAlgorithm, dataEncryptionKey, IV)
        //@ts-ignore
        decipher.setAuthTag(authTag)

        let decrypted = decipher.update(encryptedData.toString(), "hex", "utf8")
        decrypted += decipher.final("utf8")

        return Buffer.from(decrypted)
    }
}
