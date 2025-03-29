import { IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { ID } from '../../../../share/types/id.type';

export class UpdateHotelRoomDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    hotelId: string;

    @IsBoolean()
    isEnabled: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}

export class UpdateHotelRoomResponseDto {
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
