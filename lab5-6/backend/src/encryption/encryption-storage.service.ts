import { Injectable } from "@nestjs/common"
import { EncryptionPayload } from "./types/encryption-payload.type"

@Injectable()
export class EncryptionStorageService {
    private readonly encryptionPayloads: Map<string, Omit<EncryptionPayload, "id">> = new Map()

    public store(payload: EncryptionPayload): void {
        const { id, ...data } = payload
        this.encryptionPayloads.set(id, data)
    }

    public find(id: string): EncryptionPayload | null {
        const data = this.encryptionPayloads.get(id)
        return data ? { id, ...data } : null
    }
}
