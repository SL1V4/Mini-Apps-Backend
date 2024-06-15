import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PlaylistPaginationDto } from './dto/playlist.pagination.dto'
import { PlaylistDto } from './dto/playlists.dto'

@Injectable()
export class PlaylistService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: number) {
		let songs = []
		const playlist = await this.prisma.playlist.findUnique({
			where: { id: id },
			select: {
				id: true,
				name: true,
				img: true,
				songIds: true
			}
		})

		if (!playlist) {
			throw new Error('The playlist was not found or does not exist.')
		}

		if (playlist.songIds) {
			songs = await this.getSongs(playlist.songIds)

			delete playlist.songIds
		}

		return {
			...playlist,
			songs: songs
		}
	}

	async getAll(dto: PlaylistPaginationDto) {
		const { perPage, skip } = this.getPagination(dto)
		return await this.prisma.playlist.findMany({
			skip,
			take: perPage,
			select: {
				id: true,
				name: true,
				img: true,
				songIds: true
			}
		})
	}

	async getMetadataById(id: number) {
		return await this.prisma.playlist.findUnique({
			where: { id: id },
			select: {
				id: true,
				name: true
			}
		})
	}

	async create(dto: PlaylistDto) {
		if (!dto.userId) {
			throw new Error('You must be logged in!')
		}

		const playlist = await this.prisma.playlist.create({
			data: {
				name: 'My cool playlist',
				userId: dto.userId
			}
		})

		return playlist.id
	}

	async update(id: number, dto: PlaylistDto) {
		if (!dto.userId) {
			throw new Error('You must be logged in!')
		}

		const playlist = await this.prisma.playlist.update({
			where: { id },
			data: {
				name: dto.name,
				img: dto.img,
				songIds: {
					push: dto.songs
				},
				userId: dto.userId
			}
		})

		return playlist.id
	}

	async delete(id: number) {
		return this.prisma.playlist.delete({ where: { id } })
	}

	async getSongs(songIds: number[]) {
		if (songIds) {
			const songs = await this.prisma.song.findMany({
				where: { id: { in: songIds } },
				orderBy: {
					name: 'asc'
				},
				select: {
					id: true,
					url: true,
					name: true,
					author: true,
					img: true,
					createdAt: true
				}
			})

			return songs
		}

		return []
	}

	getPagination(dto: PlaylistPaginationDto, defaultPerPage: number = 10) {
		const page = dto.page ? +dto.page : 1
		const perPage = dto.perPage ? +dto.perPage : defaultPerPage
		const skip = (page - 1) * perPage

		return { perPage, skip }
	}
}
