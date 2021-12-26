import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as bodyParser from "express"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(bodyParser.json({ limit: "50mb" }))
    app.enableCors({
        origin: true,
    })
    
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(3000)
}
bootstrap()
