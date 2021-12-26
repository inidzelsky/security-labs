import { Controller, Post } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CredentialsDto } from "./dto/credentials.dto"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    public async signup(credentials: CredentialsDto) {
        return { status: "success" }
    }

    @Post()
    public async login(credentials: CredentialsDto) {
        return { status: "success" }
    }
}
