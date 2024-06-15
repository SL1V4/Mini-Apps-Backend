import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PlaylistDto {
	@IsString()
	name: string

	@IsOptional()
	img: string

	@IsOptional()
	songs?: number

	@IsNumber()
	userId: number
}
