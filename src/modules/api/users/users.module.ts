import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as BaseUsersModule } from 'src/modules/base/user/user.module';

@Module({
    imports: [BaseUsersModule],
    controllers: [UsersController],
})
export class UsersApiModule {} 