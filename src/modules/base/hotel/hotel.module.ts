import {HotelModel, HotelSchema} from "./models/hotel.model";
import {HotelService} from "./hotel.service";
import {HotelRoomService} from "./hotel-room.service";
import {HotelRoomModel, HotelRoomSchema} from "./models/hotel-room.model";
import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{name: HotelModel.name, schema: HotelSchema}]),
        MongooseModule.forFeature([{name: HotelRoomModel.name, schema: HotelRoomSchema}]),
    ],
    providers: [HotelService, HotelRoomService],
    exports: [HotelService, HotelRoomService],
})
export class HotelModule {}
