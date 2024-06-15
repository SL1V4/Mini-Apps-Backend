import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SignUpDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	password: string
}
