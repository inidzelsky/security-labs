import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { EncryptionStorageService } from "./encryption-storage.service"
import { EncryptionService } from "./encryption.service"
import { KmsService } from "./kms.service"

@Module({
    providers: [
        EncryptionStorageService,
        {
            inject: [ConfigService],
            provide: KmsService,
            useFactory: (configService: ConfigService) => {
                const kmsKeyId = configService.get("aws.kmsKeyId")
                return new KmsService(kmsKeyId)
            },
        },
        {
            inject: [ConfigService, KmsService, EncryptionStorageService],
            provide: EncryptionService,
            useFactory: async (
                configService: ConfigService,
                kmsService: KmsService,
                encryptionStorageService: EncryptionStorageService
            ) => {
                const dataEncryptionKey = configService.get("encryption.dataKey")
                const encryptionAlgorithm = configService.get("encryption.algorithm")
                const encryptedDataEncryptionKey = await kmsService.encrypt(dataEncryptionKey)
                
                return new EncryptionService(
                    kmsService,
                    encryptionStorageService,
                    encryptedDataEncryptionKey,
                    encryptionAlgorithm,
                )
            },
        },
    ],
    exports: [EncryptionService],
})
export class EncryptionModule {}
