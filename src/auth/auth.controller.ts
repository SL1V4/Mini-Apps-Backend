import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Res,
	UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { GetSessionInfoDto } from './dto/get-session-info.dto'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { CookieService } from './cookie.service'
import { Response } from 'express'
import { AuthGuard } from './auth.guard'
import { SessionInfo } from './decorators/session-info.decorator'

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	@Post('sign-up')
	@ApiCreatedResponse()
	async signUp(
		@Body() body: SignUpDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken } = await this.authService.signUp(
			body.email,
			body.password
		)

		this.cookieService.setToken(res, accessToken)
	}

	@Post('sign-in')
	@HttpCode(200)
	@ApiOkResponse()
	async signIn(
		@Body() body: SignInDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { accessToken } = await this.authService.signIn(
			body.email,
			body.password
		)

		this.cookieService.setToken(res, accessToken)
	}

	@Post('sign-out')
	@ApiOkResponse()
	@HttpCode(200)
	@UseGuards(AuthGuard)
	signOut(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res)
	}

	@Get('session')
	@ApiOkResponse({
		type: GetSessionInfoDto
	})
	@UseGuards(AuthGuard)
	getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
		return session
	}
}
