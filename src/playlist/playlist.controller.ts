import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PlaylistService } from './playlist.service'
import { PlaylistDto } from './dto/playlists.dto'
import { PlaylistPaginationDto } from './dto/playlist.pagination.dto'
//import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('playlist')
export class PlaylistController {
	constructor(private readonly PlaylistService: PlaylistService) {}

	@Get('by-id/:id')
	async getById(@Param('id') id: number) {
		return this.PlaylistService.getById(+id)
	}

	@Get()
	async getAll(@Body() dto: PlaylistPaginationDto) {
		return this.PlaylistService.getAll(dto)
	}

	@Get('metadata/by-id/:id')
	async getMetadataById(@Param('id') id: number) {
		return this.PlaylistService.getMetadataById(+id)
	}

	/* @HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: PlaylistDto) {
		return this.PlaylistService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: PlaylistDto) {
		return this.PlaylistService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.PlaylistService.delete(+id)
	} */
}
