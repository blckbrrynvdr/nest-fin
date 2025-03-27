import {Module} from "@nestjs/common";
import {HotelController} from "./hotel.controller";
import {HotelModule} from "../../base/hotel/hotel.module";

@Module({
    imports: [
        HotelModule
    ],
    controllers: [HotelController],
})

export class HotelApiModule {}
