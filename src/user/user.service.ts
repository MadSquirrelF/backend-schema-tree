import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { createUserDto } from './dto/user.dto'
import { UserStatus } from '@prisma/client'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getProfile(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getAll(searchTerm?: string) {
		if (searchTerm) this.search(searchTerm)

		return this.prisma.user.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(searchTerm: string) {
		return this.prisma.user.findMany({
			where: {
				OR: [
					{ email: { contains: searchTerm, mode: 'insensitive' } },
					{ fullName: { contains: searchTerm, mode: 'insensitive' } },
					{ position: { contains: searchTerm, mode: 'insensitive' } }
				]
			}
		})
	}

	async create(dto: createUserDto) {
		return this.prisma.user.create({
			data: dto
		})
	}

	async update(id: string, dto: createUserDto) {
		return this.prisma.user.update({
			where: {
				id
			},
			data: dto
		})
	}

	async updateStatus(id: string, status: UserStatus) {
		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				status
			}
		})
	}
}
