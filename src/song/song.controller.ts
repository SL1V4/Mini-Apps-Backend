import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { SongService } from './song.service'

@Controller('song')
export class SongController {
	constructor(private readonly songService: SongService) {}

	@Get('by-id/:id')
	async getById(@Param('id') id: number) {
		return this.songService.getById(+id)
	}

	@Get('by-query/:query')
	async searchByName(@Param('query') name: string) {
		return this.songService.searchByName(name)
	}
}
