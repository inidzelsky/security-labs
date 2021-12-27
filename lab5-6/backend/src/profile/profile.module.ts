import { Module } from "@nestjs/common"
import { DbModule } from "src/db/db.module"
import { EncryptionModule } from "src/encryption/encryption.module"
import { ProfileController } from "./profile.controller"
import { ProfileService } from "./profile.service"
import { UserPhoneRepository } from "./user-phone.repository"

@Module({
    imports: [
        EncryptionModule,
        DbModule,
    ],
    controllers: [ProfileController],
    providers: [
        ProfileService,
        UserPhoneRepository,
    ],
})
export class ProfileModule {}
