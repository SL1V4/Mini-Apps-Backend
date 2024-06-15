import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PlaylistPaginationDto {
	@IsOptional()
	@IsString()
	page?: number

	@IsOptional()
	@IsString()
	perPage?: number
}
