import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { userDto } from './dto/users.dto'
import { GetSessionInfoDto } from 'src/auth/dto/get-session-info.dto'
import { JwtService } from '@nestjs/jwt'
import { GoogleDriveService } from 'src/google/google.service'

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private jwtService: JwtService,
		private googleDriveService: GoogleDriveService
	) {}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	create(email: string, hash: string, salt: string) {
		return this.prisma.user.create({
			data: { email, hash, salt }
		})
	}

	async update(
		dto: userDto,
		session: GetSessionInfoDto,
		file: Express.Multer.File
	) {
		if (!session.id || !session.email) {
			throw new Error('User not found')
		}

		const userIsExist = await this.findByEmail(session.email)

		if (!userIsExist.id) {
			throw new Error('User not found')
		}

		try {
			let updateObj = {
				name: dto.name
			}

			if (dto.photoEvent === 'delete') {
				updateObj['avatarFileId'] = ''
				updateObj['avatarPath'] = ''
			}

			if (file) {
				const fileId = await this.googleDriveService.uploadFile(file)
				const newAvatarPath =
					await this.googleDriveService.generatePublicUrl(fileId)

				if (newAvatarPath) {
					updateObj['avatarFileId'] = fileId
					updateObj['avatarPath'] = newAvatarPath?.webContentLink
				}
			}

			if (
				(updateObj['avatarFileId'] || dto.photoEvent === 'delete') &&
				userIsExist.avatarFileId
			) {
				await this.googleDriveService.removePhotoById(userIsExist.avatarFileId)
			}

			const user = await this.prisma.user.update({
				where: { email: session.email },
				data: updateObj
			})

			if (user.id) {
				const accessToken = await this.jwtService.signAsync({
					id: user.id,
					email: user.email,
					name: user.name,
					avatarPath: user.avatarPath
				})

				return { accessToken }
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}
