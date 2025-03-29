import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../base/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        return this.usersService.create({
            ...registerDto,
            passwordHash: hashedPassword,
            role: 'client'
        });
    }

    async logout(request: Request): Promise<void> {
        return new Promise((resolve) => {
            request.session.destroy((err) => {
                if (err) {
                    console.error('session destroy error:', err);
                }
                
                resolve();
            });
        });
    }
} 
