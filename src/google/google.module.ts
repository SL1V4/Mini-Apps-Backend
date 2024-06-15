import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { GoogleDriveService } from './google.service'
import { UploadController } from './google.controller'

@Module({
	providers: [GoogleDriveService, PrismaService],
	controllers: [UploadController]
})
export class GoogleModule {}
