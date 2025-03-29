import { IsString, IsNotEmpty } from 'class-validator';
import { ID } from '../../../../share/types/id.type';

export class UpdateHotelDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class UpdateHotelResponseDto {
    _id: ID;
    title: string;
    description: string;
} 