import { Inject, Injectable } from "@nestjs/common"
import { DbServiceInjectKey, IDbService } from "src/db/interfaces/db-service.interface"
import { User } from "./types/user.type"

@Injectable()
export class UserRepository {
    constructor(
        @Inject(DbServiceInjectKey) private readonly dbService: IDbService,
    ) {}

    public async store(user: User): Promise<void> {
        const text = `
            insert into users (id, email, password)
            values ($1, $2, $3)
        `

        await this.dbService.query({
            text,
            params: [
                user.id,
                user.email,
                user.password,
            ],
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        const text = `
            select id, email, password
            from users
            where email = $1
        `

        const queryResult = await this.dbService.query({
            text,
            params: [email],
        })

        return queryResult.rows?.[0] as User ?? null
    }
}
