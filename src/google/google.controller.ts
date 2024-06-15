import {
	Controller,
	Get,
	Param,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { GoogleDriveService } from './google.service'

@Controller('google-drive')
export class UploadController {
	constructor(private readonly googleDriveService: GoogleDriveService) {}

	@Post()
	@UseInterceptors(FileInterceptor('avatar'))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		const result = await this.googleDriveService.uploadFile(file)
		return { fileId: result.id }
	}
}
