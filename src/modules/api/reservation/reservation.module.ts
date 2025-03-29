import {Module} from "@nestjs/common";
import {ReservationModule} from "../../base/reservation/reservation.module";
import { ReservationController } from "./reservation.controller";
import {HotelModule} from "../../base/hotel/hotel.module";

@Module({
    imports: [
        ReservationModule,
        HotelModule,
    ],
    controllers: [ReservationController],
})
export class ReservationApiModule {} 
