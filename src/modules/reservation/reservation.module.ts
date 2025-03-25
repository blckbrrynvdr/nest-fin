import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Reservation, ReservationSchema} from "./models/reservation";
import {ReservationService} from "./reservation.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Reservation.name, schema: ReservationSchema}])
    ],
    controllers: [],
    providers: [ReservationService],
    exports: [ReservationService],
})
export class ReservationModule {}
