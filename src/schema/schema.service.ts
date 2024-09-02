import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import {
	CreateSchemaTreeDto,
	UpdateEmployeesDto,
	UpdateSchemaTreeDto
} from './dto/schema.dto'

@Injectable()
export class SchemaService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.schema.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				id: true,
				title: true
			}
		})
	}

	async getSchemaTreeById(id: string) {
		return this.prisma.schema.findUnique({
			where: { id },
			include: {
				employees: true,
				children: true
			}
		})
	}

	async createSchemaTree(dto: CreateSchemaTreeDto) {
		return this.prisma.schema.create({
			data: dto,
			include: {
				employees: true,
				children: true
			}
		})
	}

	async delete(id: string) {
    // Находим элемент, который был создан перед удаляемым
    const previousElement = await this.prisma.schema.findFirst({
        where: {
            id: {
                not: id // Исключаем текущий элемент
            }
        },
        orderBy: {
            createdAt: 'desc' // Получаем последний элемент перед удаляемым по времени создания
        }
    });

    // Удаляем элемент
     await this.prisma.schema.delete({
        where: {
            id
        }
    });

    // Возвращаем id предыдущего элемента, если он существует
    return previousElement ? previousElement.id : null;
}

	async updateSchema(id: string, dto: UpdateSchemaTreeDto) {
		return this.prisma.schema.update({
			where: { id },
			data: dto,
			include: {
				employees: true,
				children: true
			}
		})
	}

	async addEmployeeToSchema(id: string, data: UpdateEmployeesDto) {
		return this.prisma.schema.update({
			where: { id },
			data: {
				employees: {
					set: data.employeeIds.map(userId => ({ id: userId })),
					disconnect: data.employeeIds
						.filter(userId => !data.employeeIds.includes(userId))
						.map(userId => ({ id: userId }))
				}
			},
			include: {
				employees: true,
				children: true
			}
		})
	}
}
