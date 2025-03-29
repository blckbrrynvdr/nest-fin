import { IsString, IsNotEmpty } from 'class-validator';
import { ID } from '../../../../share/types/id.type';

export class CreateHotelDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class CreateHotelResponseDto {
    _id: ID;
    title: string;
    description: string;
} 