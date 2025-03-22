import { IsOptional, IsString, Matches } from 'class-validator';
import {TRole} from "../types/user.type";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @Matches(/^(\+?\d{1,3})?\s?(?:$(\d{3})$|\d{3})\s?(\d{3}|\d{4})-?\d{4}$/, {
        message: 'Invalid phone format.',
    })
    contactPhone?: string;

    @IsOptional()
    @IsString()
    role?: TRole;
}
