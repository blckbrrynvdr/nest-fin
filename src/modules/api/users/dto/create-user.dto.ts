import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { TRole } from 'src/modules/base/user/types/user.type';

export class CreateUserDto {
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

    @IsEnum(['admin', 'manager', 'client'])
    @IsNotEmpty()
    role: TRole;
}

export class CreateUserResponseDto {
    id: string;
    email: string;
    name: string;
    contactPhone: string;
    role: TRole;
} 