import {Controller, Get, Query, ValidationPipe, Param, UseGuards, Post, Body, Put, UseInterceptors, UploadedFiles} from "@nestjs/common";
import {API_PREFIX} from "../../../share/constants/api.constant";
import {HotelRoomService} from "../../base/hotel/hotel-room.service";
import {SearchHotelRoomsDto} from "./dto/search-hotel-rooms.dto";
import { HotelRoomModel } from "src/modules/base/hotel/models/hotel-room.model";
import { ID } from "src/share/types/id.type";
import {AccessGuard} from "../../../guards/access.guard";
import {CreateHotelDto, CreateHotelResponseDto} from "./dto/create-hotel.dto";
import {HotelService} from "../../base/hotel/hotel.service";
import {SearchHotelsDto} from "./dto/search-hotels.dto";
import {UpdateHotelDto, UpdateHotelResponseDto} from "./dto/update-hotel.dto";
import {CreateHotelRoomDto, CreateHotelRoomResponseDto} from "./dto/create-hotel-room.dto";
import {UpdateHotelRoomDto, UpdateHotelRoomResponseDto} from "./dto/update-hotel-room.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller(API_PREFIX)
@UseGuards(AccessGuard)
export class HotelController {
    constructor(
        private readonly hotelRoomService: HotelRoomService,
        private readonly hotelService: HotelService
    ) {}

    // 2.1.1. Поиск номеров
    @Get('common/hotel-rooms')
    async searchRooms(@Query(new ValidationPipe({ transform: true })) query: SearchHotelRoomsDto): Promise<HotelRoomModel[]> {
        const { limit = 10, offset = 0, hotel } = query;
        
        const searchParams = {
            limit,
            offset,
            hotel,
            isEnabled: true
        };

        return this.hotelRoomService.search(searchParams);
    }

    // 2.1.2. Информация о конкретном номере
    @Get('common/hotel-rooms/:id')
    async getRoom(@Param('id') id: ID): Promise<HotelRoomModel> {
        return this.hotelRoomService.findById(id);
    }

    // 2.1.3. Создание гостиницы
    @Post('admin/hotels')
    async createHotel(@Body(new ValidationPipe({ transform: true })) createHotelDto: CreateHotelDto): Promise<CreateHotelResponseDto> {
        return this.hotelService.create(createHotelDto);
    }

    // 2.1.4. Получение списка гостиниц
    @Get('admin/hotels')
    async searchHotels(@Query(new ValidationPipe({ transform: true })) query: SearchHotelsDto): Promise<CreateHotelResponseDto[]> {
        const { limit = 10, offset = 0, title } = query;
        
        const searchParams = {
            limit,
            offset,
            title
        };

        return this.hotelService.search(searchParams);
    }

    // 2.1.5. Изменение описания гостиницы
    @Put('admin/hotels/:id')
    async updateHotel(
        @Param('id') id: ID,
        @Body(new ValidationPipe({ transform: true })) updateHotelDto: UpdateHotelDto
    ): Promise<UpdateHotelResponseDto> {
        return this.hotelService.update(id, updateHotelDto);
    }

    // 2.1.6. Добавление номера
    @Post('admin/hotel-rooms')
    @UseInterceptors(FilesInterceptor('images'))
    async createHotelRoom(
        @Body(new ValidationPipe({ transform: true })) createHotelRoomDto: CreateHotelRoomDto,
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<CreateHotelRoomResponseDto> {
        const { description, hotelId } = createHotelRoomDto;
        const images = files.map(file => file.path);

        const hotelRoom = await this.hotelRoomService.create({
            description,
            hotel: hotelId,
            images,
            isEnabled: true
        });

        const hotel = await this.hotelService.findById(hotelId);

        return {
            _id: hotelRoom._id,
            description: hotelRoom.description,
            images: hotelRoom.images,
            isEnabled: hotelRoom.isEnabled,
            hotel: {
                _id: hotel._id,
                title: hotel.title,
                description: hotel.description
            }
        };
    }

    // 2.1.7. Изменение описания номера
    @Put('admin/hotel-rooms/:id')
    @UseInterceptors(FilesInterceptor('images'))
    async updateHotelRoom(
        @Param('id') id: ID,
        @Body(new ValidationPipe({ transform: true })) updateHotelRoomDto: UpdateHotelRoomDto,
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<UpdateHotelRoomResponseDto> {
        const { description, hotelId, isEnabled, images: existingImages = [] } = updateHotelRoomDto;
        
        // Объединяем существующие изображения с новыми
        const newImages = files.map(file => file.path);
        const allImages = [...existingImages, ...newImages];

        const hotelRoom = await this.hotelRoomService.update(id, {
            description,
            hotel: hotelId,
            images: allImages,
            isEnabled
        });

        const hotel = await this.hotelService.findById(hotelId);

        return {
            _id: hotelRoom._id,
            description: hotelRoom.description,
            images: hotelRoom.images,
            isEnabled: hotelRoom.isEnabled,
            hotel: {
                _id: hotel._id,
                title: hotel.title,
                description: hotel.description
            }
        };
    }
}
