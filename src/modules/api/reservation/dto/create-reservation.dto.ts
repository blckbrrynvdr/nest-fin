import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    hotelRoom: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @IsDateString()
    @IsNotEmpty()
    endDate: string;
}

export class CreateReservationResponseDto {
    startDate: string;
    endDate: string;
    hotelRoom: {
        description: string;
        images: string[];
    };
    hotel: {
        title: string;
        description: string;
    };
} 