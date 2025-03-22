import { IsEmail, IsString, MinLength } from 'class-validator';
import {TRole} from "../types/user.type";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsString()
    contactPhone?: string;

    role: TRole;
}
