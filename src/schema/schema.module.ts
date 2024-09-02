import { Module } from '@nestjs/common'
import { SchemaService } from './schema.service'
import { SchemaController } from './schema.controller'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Module({
	controllers: [SchemaController],
	providers: [SchemaService, PrismaService, UserService]
})
export class SchemaModule {}
