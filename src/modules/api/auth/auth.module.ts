import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../../base/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from "./serializers/session.serializer";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ session: true })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {} 
