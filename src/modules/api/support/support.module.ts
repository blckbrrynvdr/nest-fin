import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportModule as BaseSupportModule } from 'src/modules/base/support/support.module';
import { UsersModule } from 'src/modules/base/user/user.module';

@Module({
    imports: [BaseSupportModule, UsersModule],
    controllers: [SupportController],
})
export class SupportApiModule {} 