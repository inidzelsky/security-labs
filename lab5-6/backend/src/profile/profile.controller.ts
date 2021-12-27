import { 
    Body,
    ConflictException,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
} from "@nestjs/common"
import { GetPhoneDto } from "./dto/get-phone.dto"
import { SavePhoneDto } from "./dto/save-phone.dto"
import { SuccessfulResponseDto } from "./dto/successful-response.dto"
import { ProfileService } from "./profile.service"

@Controller("profile")
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post(":userId/phone")
    public async savePhone(
        @Param("userId") userId: string,
        @Body() { phone }: SavePhoneDto 
    ): Promise<SuccessfulResponseDto> {
        try {
            await this.profileService.savePhone({ userId, phone })
            return { status: "okay" }
        } catch (exception: unknown) {
            switch ((exception as Error).message) {
                case "user_phone_already_exists":
                    throw new ConflictException("User phone already exists")
                
                default:
                    throw new InternalServerErrorException()
            }
        }
    }

    @Get(":userId/phone")
    public async getPhone(
        @Param("userId") userId: string,
    ): Promise<GetPhoneDto> {
        try {
            return await this.profileService.getPhone(userId)
        } catch (exception: unknown) {
            switch ((exception as Error).message) {
                case "user_phone_not_found":
                    throw new NotFoundException("User phone not found")
                
                default:
                    throw new InternalServerErrorException()
            }
        }
    }
}
