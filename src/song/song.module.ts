import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SongController } from './song.controller'
import { SongService } from './song.service'

@Module({
	controllers: [SongController],
	providers: [SongService, PrismaService]
})
export class SongModule {}
