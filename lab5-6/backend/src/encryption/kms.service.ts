import { Injectable } from "@nestjs/common"
import { KMS } from "aws-sdk"

@Injectable()
export class KmsService {
    private readonly kmsClient: KMS

    constructor(
        private readonly keyId: string,
    ) {
        this.kmsClient = new KMS()
    }

    public async encrypt(rawData: Buffer): Promise<Buffer> {
        const result = await this.kmsClient.encrypt({
            KeyId: this.keyId,
            Plaintext: rawData,
        }).promise()

        return result.CiphertextBlob as Buffer
    }

    public async decrypt(encryptedData: Buffer): Promise<Buffer> {
        const result = await this.kmsClient.decrypt({
            KeyId: this.keyId,
            CiphertextBlob: encryptedData,
        }).promise()

        return result.Plaintext as Buffer
    }
}
