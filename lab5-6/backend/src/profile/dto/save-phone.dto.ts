import { IsPhoneNumber } from "class-validator"

export class SavePhoneDto {
    @IsPhoneNumber()
    phone!: string
}
