import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ID } from '../../../../share/types/id.type';

export class CreateHotelRoomDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    hotelId: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];
}

export class CreateHotelRoomResponseDto {
    _id: ID;
    description: string;
    images: string[];
    isEnabled: boolean;
    hotel: {
        _id: ID;
        title: string;
        description: string;
    };
} 