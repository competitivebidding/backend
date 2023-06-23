import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { cors: true })

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(process.env.PORT || 3000, '0.0.0.0')
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
