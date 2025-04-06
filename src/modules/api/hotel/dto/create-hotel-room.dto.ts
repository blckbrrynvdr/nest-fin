import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ID } from '../../../../share/types/id.type';

export class CreateHotelRoomDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    hotelId: string;

    @IsArray()
    images: Express.Multer.File[];
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
