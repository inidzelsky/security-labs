import { Injectable } from "@nestjs/common"
import { CredentialsDto } from "../dto/credentials.dto"
import PasswordValidator = require("password-validator")

@Injectable()
export class PasswordValidationService {
    private validationSchema: PasswordValidator

    constructor() {
        const validationSchema = new PasswordValidator
        this.validationSchema = validationSchema
            .is().min(8)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().symbols()
    }

    public validate({ email, password }: CredentialsDto): boolean {
        return this.validationSchema.is().not(new RegExp(email.split("@")[0], "i"))
            .validate(password)
    }
}
