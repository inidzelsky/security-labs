import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Pool } from "pg"
import { PostgresDbService } from "./db.service"
import { DbServiceInjectKey } from "./interfaces/db-service.interface"

@Module({
    providers: [
        {
            inject: [ConfigService],
            provide: DbServiceInjectKey,
            useFactory: (configService: ConfigService) => {
                const poolConfig = new Pool({
                    host: configService.get("db.pg.host"),
                    port: configService.get("db.pg.port"),
                    user: configService.get("db.pg.user"),
                    password: configService.get("db.pg.password"),
                    database: configService.get("db.pg.database"),
                })

                return PostgresDbService.init(poolConfig)
            },
        },
    ],
    exports: [DbServiceInjectKey],
})
export class DbModule {}
