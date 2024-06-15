import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { json } from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	app.use(cookieParser())
	app.use(json({ limit: '5mb' }))
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(4000)
}
bootstrap()
