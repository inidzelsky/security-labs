import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { ProfileModule } from "./profile/profile.module"
import config from "./config"

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
            load: [config],
        }),
        ProfileModule,
    ],
})
export class AppModule {}
