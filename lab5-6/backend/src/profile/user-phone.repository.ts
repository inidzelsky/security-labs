import { Inject, Injectable } from "@nestjs/common"
import { IDbService, DbServiceInjectKey } from "src/db/interfaces/db-service.interface"
import { UserPhone } from "./types/user-phone.type"

@Injectable()
export class UserPhoneRepository {
    constructor(
        @Inject(DbServiceInjectKey) private readonly dbService: IDbService
    ) {}

    public async store({ userId, phone }: UserPhone) {
        const text = `
            insert into user_phones (user_id, phone)
            values ($1, $2)
        `

        await this.dbService.query({
            text,
            params: [userId, phone],
        })
    }

    public async findByUserId(userId: string): Promise<UserPhone | null> {
        const text = `
            select user_id as "userId", phone
            from user_phones
            where user_id = $1
        `

        const result = await this.dbService.query({
            text,
            params: [userId],
        })

        return result.rows?.[0] as UserPhone ?? null
    }
}
