import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { HashService } from "./hash.service"
import { DbModule } from "src/db/db.module"
import { PasswordValidationService } from "./utils/password-validation.service"
import { AuthRepository } from "./auth.repository"

@Module({
    imports: [DbModule],
    controllers: [AuthController],
    providers: [
        PasswordValidationService,
        AuthService,
        AuthRepository,
        HashService,
    ],
})
export class AuthModule {}
