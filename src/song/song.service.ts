import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SongService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: number) {
		const song = this.prisma.song.findUnique({
			where: { id: id },
			select: {
				id: true,
				url: true,
				name: true,
				author: true,
				img: true
			}
		})

		if (!song) {
			throw new Error('The song was not found or does not exist.')
		}

		return song
	}

	async searchByName(name: string) {
		const song = this.prisma.song.findMany({
			where: {
				name: {
					contains: name,
					mode: 'insensitive'
				}
			},
			select: {
				id: true,
				url: true,
				name: true,
				author: true,
				img: true
			}
		})

		if (!song) {
			throw new Error('The songs was not found or does not exist.')
		}

		return song
	}
}
