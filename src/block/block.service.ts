import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateBlockDto } from './dto/block.dto'

@Injectable()
export class BlockService {
	constructor(private prisma: PrismaService) {}



	async createBlock(parentId: string, dto: CreateBlockDto) {
		// Проверка существования родительского блока
		const parentBlock = await this.prisma.block.findUnique({
			where: { id: parentId }
		})

		if (!parentBlock) {
			throw new Error('Parent block not found')
		}

		// Создание нового блока
		const newBlock = await this.prisma.block.create({
			data: {
				title: dto.title,
				description: dto.description,
				tskp: dto.tskp,
				// Связываем новый блок с родительским
				parent: { connect: { id: parentId } }
			}
		})

		// Обновление родительского блока, чтобы добавить новый блок в children
		await this.prisma.block.update({
			where: { id: parentId },
			data: {
				children: {
					connect: { id: newBlock.id }
				}
			}
		})

		return newBlock // Возвращаем созданный блок
	}
}
