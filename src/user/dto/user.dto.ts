import { UserRole, UserStatus } from '@prisma/client'
import { IsEmail, IsEnum, IsString } from 'class-validator'

export class createUserDto {
	@IsEmail()
	email: string

	@IsString()
	fullName: string

	@IsString()
	avatarPath: string

	@IsString()
	phone: string

	@IsString()
	workPhone: string

	@IsString()
	position: string

	@IsString()
	birthday: string

	@IsString()
	vksLink: string

	@IsEnum(UserStatus)
	status: UserStatus

	@IsEnum(UserRole)
	role: UserRole
}
