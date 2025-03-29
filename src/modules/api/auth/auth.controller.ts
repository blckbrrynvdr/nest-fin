import { Controller, Post, Body, ValidationPipe, BadRequestException, UseGuards, Req, Request, Get } from '@nestjs/common';
import { API_PREFIX } from '../../../share/constants/api.constant';
import {LoginDto, LoginResponseDto} from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/auth-guard.guard';

@Controller(API_PREFIX)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 2.3.1. Вход
    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    async login(
        @Request() req,
        @Body(new ValidationPipe({ transform: true })) loginDto: LoginDto
    ): Promise<LoginResponseDto> {
        console.log('------------------------------');
        console.log('@Post(auth/login) req', req);
        console.log('------------------------------');
        console.log('@Post(auth/login) req.user.email', req.user.email);
        console.log('session', req?.session)
   
        // const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return {
            email: req.user.email,
            name: req.user.name,
            contactPhone: req.user.contactPhone
        };
    }

    // 2.3.2. Выход
    @Post('auth/logout')
    @UseGuards(LocalAuthGuard)
    async logout(@Req() req): Promise<void> {
        console.log('req user', req?.user)
        console.log('req sess', req?.session)
        req.logout();
        // this.authService.logout(req);
        // return new Promise((resolve, reject) => {
        //     req.logout((err) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve();
        //         }
        //     });
        // });
    }

    @Get('auth/test')
    @UseGuards(LocalAuthGuard)
    async test(@Req() req): Promise<void> {
        console.log('///////////////////');
        console.log('@Get(auth/test) req', req);
        console.log('///////////////////');
        return req.user;
    }

    // 2.3.3. Регистрация
    @Post('client/register')
    async register(
        @Body(new ValidationPipe({ transform: true })) registerDto: RegisterDto
    ): Promise<RegisterResponseDto> {
        try {
            const user = await this.authService.register(registerDto);
            return {
                id: user._id,
                email: user.email,
                name: user.name
            };
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Email уже занят');
            }
            throw error;
        }
    }
} 
