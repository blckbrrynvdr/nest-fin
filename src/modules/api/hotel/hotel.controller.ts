import {Controller, Get, Query, ValidationPipe, Param, UseGuards, Post, Body} from "@nestjs/common";
import {API_PREFIX} from "../../../share/constants/api.constant";
import {HotelRoomService} from "../../base/hotel/hotel-room.service";
import {SearchHotelRoomsDto} from "./dto/search-hotel-rooms.dto";
import { HotelRoomModel } from "src/modules/base/hotel/models/hotel-room.model";
import { ID } from "src/share/types/id.type";
import {AccessGuard} from "../../../guards/access.guard";
import {CreateHotelDto, CreateHotelResponseDto} from "./dto/create-hotel.dto";
import {HotelService} from "../../base/hotel/hotel.service";

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
}
