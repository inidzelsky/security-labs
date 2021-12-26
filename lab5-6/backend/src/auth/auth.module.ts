import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { HashService } from "./hash.service"
import { DbModule } from "src/db/db.module"
import { PasswordValidationService } from "./utils/password-validation.service"
import { UserRepository } from "./user.repository"

@Module({
    imports: [DbModule],
    controllers: [AuthController],
    providers: [
        PasswordValidationService,
        AuthService,
        UserRepository,
        HashService,
    ],
})
export class AuthModule {}
