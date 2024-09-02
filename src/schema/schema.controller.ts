import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SchemaService } from './schema.service'
import {
	CreateSchemaTreeDto,
	UpdateEmployeesDto,
	UpdateSchemaTreeDto
} from './dto/schema.dto'

@Controller('schemas')
export class SchemaController {
	constructor(private readonly schemaService: SchemaService) {}

	@Get(':id')
	async getSchemaTreeById(@Param('id') id: string) {
		return this.schemaService.getSchemaTreeById(id)
	}

	@Get()
	async getAll() {
		return this.schemaService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	@HttpCode(200)
	async update(@Param('id') id: string, @Body() dto: UpdateSchemaTreeDto) {
		return this.schemaService.updateSchema(id, dto)
	}

	@Post()
	@HttpCode(200)
	async create(@Body() dto: CreateSchemaTreeDto) {
		return this.schemaService.createSchemaTree(dto)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.schemaService.delete(id)
	}

	@UsePipes(new ValidationPipe())
	@Patch('employees/:id')
	@HttpCode(200)
	async addEmployeeToSchema(
		@Param('id') id: string,
		@Body() employees: UpdateEmployeesDto
	) {
		return this.schemaService.addEmployeeToSchema(id, employees)
	}
}
