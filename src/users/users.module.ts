import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaService } from 'src/prisma.service'
import { UsersController } from './users.controller'
import { CookieService } from 'src/auth/cookie.service'
import { GoogleDriveService } from 'src/google/google.service'

@Module({
	exports: [UsersService],
	providers: [UsersService, PrismaService, CookieService, GoogleDriveService],
	controllers: [UsersController]
})
export class UsersModule {}
