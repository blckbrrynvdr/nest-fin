import {Hotel, HotelSchema} from "./models/hotel";
import {HotelService} from "./hotel.service";
import {HotelRoomService} from "./hotel-room.service";
import {HotelRoom, HotelRoomSchema} from "./models/hotel.room";
import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Hotel.name, schema: HotelSchema}]),
        MongooseModule.forFeature([{name: HotelRoom.name, schema: HotelRoomSchema}]),
    ],
    controllers: [],
    providers: [HotelService, HotelRoomService],
    exports: [HotelService, HotelRoomService],
})
export class HotelModule {}
