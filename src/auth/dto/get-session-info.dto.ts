import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber } from 'class-validator'

export class GetSessionInfoDto {
	@ApiProperty()
	@IsNumber()
	id: number

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNumber()
	iat: number

	@ApiProperty()
	@IsNumber()
	exp: number
}
