import { Injectable } from "@nestjs/common"
import { CredentialsDto } from "./dto/credentials.dto"
import { HashService } from "./hash.service"
import { PasswordValidationService } from "./utils/password-validation.service"
import { randomUUID } from "crypto"
import { User } from "./types/user.type"
import { UserRepository } from "./user.repository"
import { UserResponseDto } from "./dto/user.dto"

@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly passwordValidationService: PasswordValidationService,
        private readonly userRepository: UserRepository,
    ) {}

    public async signup(credentials: CredentialsDto): Promise<UserResponseDto> {
        const { email, password } = credentials
        if (await this.userRepository.findByEmail(email))
            throw new Error("user_already_exists")

        if (!this.passwordValidationService.validate(credentials))
            throw new Error("user_password_validation_failed")

        const hashedPassword = await this.hashService.hash(password)
        const user: User = {
            id: randomUUID(),
            email,
            password: hashedPassword,
        }

        await this.userRepository.store(user)
        return { id: user.id, email: user.email }
    }

    public async login(credentials: CredentialsDto): Promise<UserResponseDto> {
        const { email, password } = credentials

        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new Error("user_not_found")

        const isValidPassword = await this.hashService.verify(password, user.password)
        if (!isValidPassword) throw new Error("invalid_user_password")

        return { id: user.id, email: user.email }
    }
}
