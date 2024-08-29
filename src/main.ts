import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as bodyParser from 'body-parser'
import { AppModule } from './app.module'
import { CustomBadRequestExceptionFilter } from './utils'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new CustomBadRequestExceptionFilter())
    app.use(bodyParser.json({ limit: '10mb' })) // Altere '10mb' para o limite desejado
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })) // Se você também está lidando com dados URL-encoded

    await app.listen(3000)
}
bootstrap()
