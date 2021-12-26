import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    InternalServerErrorException,
    NotFoundException,
    Post,
    UnauthorizedException,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CredentialsDto } from "./dto/credentials.dto"
import { UserResponseDto } from "./dto/user.dto"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    public async signup(@Body() credentials: CredentialsDto): Promise<UserResponseDto> {
        try {
            return await this.authService.signup(credentials)
        } catch(exception: unknown) {
            switch((exception as Error).message) {
                case "user_already_exists":
                    throw new ConflictException("User already exists")

                case "user_password_validation_failed":
                    throw new BadRequestException("Password validation failed")

                default:
                    throw new InternalServerErrorException()
            }
        }
    }

    @Post("login")
    public async login(@Body() credentials: CredentialsDto): Promise<UserResponseDto> {
        try {
            return await this.authService.login(credentials)
        } catch(exception: unknown) {
            switch((exception as Error).message) {
                case "user_not_found":
                    throw new NotFoundException("User not found")

                case "invalid_user_password":
                    throw new UnauthorizedException("Invalid password")

                default:
                    throw new InternalServerErrorException()
            }
        }
    }
}
