import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { GetPhoneDto } from "./dto/get-phone.dto"
import { SavePhoneDto } from "./dto/save-phone.dto"
import { SuccessfulResponseDto } from "./dto/successful-response.dto"

@Controller("profile")
export class ProfileController {
    @Post(":userId/phone")
    public async savePhone(
        @Query("userId") userId: string,
        @Body() { phone }: SavePhoneDto 
    ): Promise<SuccessfulResponseDto> {
        return { status: "okay" }
    }

    @Get(":userId/phone")
    public async getPhone(
        @Query("userId") userId: string,
    ): Promise<GetPhoneDto> {
        return { phone: "" }
    }
}
