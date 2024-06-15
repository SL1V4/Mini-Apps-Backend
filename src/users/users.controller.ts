import {
	Body,
	Controller,
	HttpCode,
	Put,
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { userDto } from './dto/users.dto'
import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetSessionInfoDto } from 'src/auth/dto/get-session-info.dto'
import { SessionInfo } from 'src/auth/decorators/session-info.decorator'
import { CookieService } from 'src/auth/cookie.service'
import { Response } from 'express'
import { ApiOkResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
		private cookieService: CookieService
	) {}

	@Put()
	@HttpCode(200)
	@UseGuards(AuthGuard)
	@ApiOkResponse({
		type: GetSessionInfoDto
	})
	@UseInterceptors(FileInterceptor('avatar'))
	async update(
		@Body('body') dto: userDto,
		@SessionInfo() session: GetSessionInfoDto,
		@Res({ passthrough: true }) res: Response,
		@UploadedFile() file: Express.Multer.File
	) {
		const result = await this.usersService.update(dto, session, file)

		if (result?.accessToken) {
			this.cookieService.setToken(res, result.accessToken)
		}
	}
}
