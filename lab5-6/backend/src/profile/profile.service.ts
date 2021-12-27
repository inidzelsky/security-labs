import { Injectable } from "@nestjs/common"
import { EncryptionService } from "src/encryption/encryption.service"
import { UserPhone } from "./types/user-phone.type"
import { UserPhoneRepository } from "./user-phone.repository"

@Injectable()
export class ProfileService {
    constructor(
        private readonly encryptionService: EncryptionService,
        private readonly userPhoneRepository: UserPhoneRepository,
    ) {}
    
    public async savePhone({ userId, phone }: UserPhone): Promise<void> {
        const encryptedPhone = await this.encryptionService.encrypt(
            userId,
            Buffer.from(phone)
        )

        if (await this.userPhoneRepository.findByUserId(userId))
            throw new Error("user_phone_already_exists")

        await this.userPhoneRepository.store({ userId, phone: encryptedPhone.toString() })
    }

    public async getPhone(userId: string): Promise<UserPhone> {
        const userPhone = await this.userPhoneRepository.findByUserId(userId)
        if (!userPhone)
            throw new Error("user_phone_not_found")

        const { phone } = userPhone
        const decryptedPhone = await this.encryptionService.decrypt(userId, Buffer.from(phone))

        return { userId, phone: decryptedPhone.toString() }
    }
}
