import { Injectable } from '@nestjs/common'
import { google } from 'googleapis'
import * as path from 'path'
import { Readable } from 'stream'

@Injectable()
export class GoogleDriveService {
	private drive

	constructor() {
		const auth = new google.auth.GoogleAuth({
			keyFile: path.join(__dirname, '../../credentials.json'),
			scopes: ['https://www.googleapis.com/auth/drive']
		})

		this.drive = google.drive({ version: 'v3', auth })
	}

	async uploadFile(file: Express.Multer.File) {
		const fileMetadata = {
			name: file.originalname,
			parents: ['1Qnm3udYeBvqxRMcvr23H2VPs2k5GO113']
		}

		const stream = Readable.from(file.buffer)

		const media = {
			mimeType: file.mimetype,
			body: stream
		}

		try {
			const response = await this.drive.files.create({
				requestBody: fileMetadata,
				media: media,
				fields: 'id'
			})

			return response.data.id
		} catch (error) {
			throw new Error('Error uploading file to Google Drive')
		}
	}

	async getPhotoById(id: string) {
		return await this.drive.files.get({
			fileId: id,
			fields: 'webContentLink'
		})
	}

	async removePhotoById(id: string) {
		try {
			await this.drive.files.delete({
				fileId: id
			})
		} catch (error) {
			throw new Error('Error deleting file from Google Drive')
		}
	}

	async generatePublicUrl(id: string) {
		try {
			if (!id) {
				throw new Error('File id is empty')
			}

			await this.drive.permissions.create({
				fileId: id,
				requestBody: {
					role: 'reader',
					type: 'anyone'
				}
			})

			const result = await this.getPhotoById(id)

			return result.data
		} catch (error) {
			throw new Error('Error generate public url file from Google Drive')
		}
	}
}
