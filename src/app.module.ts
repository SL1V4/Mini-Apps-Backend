import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SongModule } from './song/song.module'
import { PlaylistModule } from './playlist/playlist.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { GoogleModule } from './google/google.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
	imports: [
		AuthModule,
		SongModule,
		PlaylistModule,
		UsersModule,
		GoogleModule,
		ConfigModule.forRoot(),
		MulterModule.register({
			dest: './uploads' // Temporary folder for storing uploaded files
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
