import {Module} from "@nestjs/common";
import {ReservationModule} from "../../base/reservation/reservation.module";
import { ReservationController } from "./reservation.controller";

@Module({
    imports: [
        ReservationModule
    ],
    controllers: [ReservationController],
})
export class ReservationApiModule {} 