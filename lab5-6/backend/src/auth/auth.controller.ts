import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CredentialsDto } from "./dto/credentials.dto"
import { UserResponseDto } from "./dto/user.dto"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    public async signup(@Body() credentials: CredentialsDto): Promise<UserResponseDto> {
        return await this.authService.signup(credentials)
    }

    @Post("login")
    public async login(@Body() credentials: CredentialsDto) {
        return { status: "success" }
    }
}
