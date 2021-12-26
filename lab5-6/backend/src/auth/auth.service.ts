import { Injectable } from "@nestjs/common"
import { CredentialsDto } from "./dto/credentials.dto"
import { HashService } from "./hash.service"
import { PasswordValidationService } from "./utils/password-validation.service"
import { randomUUID } from "crypto"
import { User } from "./types/user.type"
import { AuthRepository } from "./auth.repository"
import { UserResponseDto } from "./dto/user.dto"

@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly passwordValidationService: PasswordValidationService,
        private readonly authRepository: AuthRepository,
    ) {}

    public async signup(credentials: CredentialsDto): Promise<UserResponseDto> {
        const { email, password } = credentials
        if (await this.authRepository.findByEmail(email))
            throw new Error("User already exists")

        if (!this.passwordValidationService.validate(credentials))
            throw new Error("Password validation failed")

        const hashedPassword = await this.hashService.hash(password)
        const user: User = {
            id: randomUUID(),
            email,
            password: hashedPassword,
        }

        await this.authRepository.store(user)
        return { id: user.id, email: user.email }
    }
}
