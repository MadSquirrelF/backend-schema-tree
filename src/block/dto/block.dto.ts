import { IsOptional, IsString } from 'class-validator'

export class CreateBlockDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	tskp: string
}

export class UpdateBlockTreeDto {
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
