import {
	Body,
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { createUserDto } from './dto/user.dto'
import { UserStatus } from '@prisma/client'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	async getProfile(@Param('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm: string) {
		return this.userService.getAll(searchTerm)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	async update(@Param('id') id: string, @Body() dto: createUserDto) {
		const updatedUser = await this.userService.update(id, dto)

		if (!updatedUser) {
			throw new NotFoundException('Пользователь не найден')
		}

		return updatedUser
	}

	@Post()
	@HttpCode(200)
	async create(@Body() dto: createUserDto) {
		const newUser = await this.userService.create(dto)

		return newUser
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@HttpCode(200)
	async updateStatus(
		@Param('id') id: string,
		@Body() body: { status: string }
	) {
		const userStatus: UserStatus = body.status as UserStatus // Приводим к типу UserStatus
		const updatedUser = await this.userService.updateStatus(id, userStatus)

		if (!updatedUser) {
			throw new NotFoundException('Пользователь не найден')
		}

		return updatedUser
	}
}
