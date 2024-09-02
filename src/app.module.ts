import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { SchemaModule } from './schema/schema.module';
import { BlockModule } from './block/block.module';

@Module({
	imports: [UserModule, SchemaModule, BlockModule]
})
export class AppModule {}
