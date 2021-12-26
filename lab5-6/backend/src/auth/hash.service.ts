import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { hash, verify } from "argon2"

@Injectable()
export class HashService {
    constructor(private readonly configService: ConfigService) {}

    public async hash(raw: string): Promise<string> {
        return await hash(raw, { 
            type: this.configService.get("auth.argon.type"),
            parallelism: this.configService.get("auth.argon.parallelism"),
            memoryCost: this.configService.get("auth.argon.memory"),
            timeCost: this.configService.get("auth.argon.time"),
            secret: this.configService.get("auth.argon.secret"),
        })
    }

    public async verify(raw: string, hashed: string): Promise<boolean> {
        return await verify(hashed, raw, {
            secret: this.configService.get("auth.argon.secret"),
        })
    }
}
