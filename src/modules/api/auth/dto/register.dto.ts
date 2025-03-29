import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ID } from 'src/share/types/id.type';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    contactPhone: string;
}

export class RegisterResponseDto {
    id: ID;
    email: string;
    name: string;
} 