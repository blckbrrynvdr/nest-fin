import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportModule as BaseSupportModule } from 'src/modules/base/support/support.module';
import { UsersModule } from 'src/modules/base/user/user.module';
import { SupportGateway } from './support.gateway';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../auth/strategies/local.strategy";
import {SessionSerializer} from "../auth/serializers/session.serializer";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        BaseSupportModule,
        UsersModule,
        PassportModule.register({ session: true }),
        // AuthModule,
    ],
    controllers: [SupportController],
    providers: [
        SupportGateway,
        // LocalStrategy,
        // SessionSerializer,
        // AuthService
    ]
})
export class SupportApiModule {} 
