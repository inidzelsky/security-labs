export type EncryptionPayload = {
    id: string
    IV: Buffer
    authTag: Buffer
}
