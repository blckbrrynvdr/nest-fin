import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async authenticate(req: Request, options?: any) {
        console.log('///////////////////////////////////////////');
        console.log('LocalStrategy authenticate req', req);
        console.log('///////////////////////////////////////////');
        console.log('LocalStrategy authenticate req?.user', req?.user);
        console.log('LocalStrategy authenticate req?.email', req['email']);
        console.log('LocalStrategy authenticate req?.session', req?.session);
        const sessionCookie = req.cookies['connect.sid'];
        console.log('Session cookie:', sessionCookie);

        if (sessionCookie) {
            console.log('LocalStrategy isValidSession');
            return this.success(req?.user);
        }

        console.log('LocalStrategy authenticate 2');

        // Если нет cookie или она невалидна, продолжаем стандартную валидацию
        return super.authenticate(req, options);
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('LocalStrategy validate1', email, password);
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
} 
