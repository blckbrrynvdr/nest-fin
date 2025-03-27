import {Controller, Get, Query, ValidationPipe, Param} from "@nestjs/common";
import {API_PREFIX} from "../../../share/constants/api.constant";
import {HotelRoomService} from "../../base/hotel/hotel-room.service";
import {SearchHotelRoomsDto} from "./dto/search-hotel-rooms.dto";
import { HotelRoomModel } from "src/modules/base/hotel/models/hotel-room.model";
import { ID } from "src/share/types/id.type";

@Controller(API_PREFIX)
export class HotelController {
    constructor(private readonly hotelRoomService: HotelRoomService) {
    }

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
}
