import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateSchemaTreeDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	tskp: string
}

export class UpdateSchemaTreeDto {
	@IsOptional()
	@IsString()
	title: string

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsString()
	tskp: string
}

export class UpdateEmployeesDto {
	@IsArray()
	@IsString({ each: true })
	employeeIds: string[]
}
