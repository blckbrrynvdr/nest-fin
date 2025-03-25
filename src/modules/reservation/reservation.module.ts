import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ReservationModel, ReservationSchema} from "./models/reservation.model";
import {ReservationService} from "./reservation.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: ReservationModel.name, schema: ReservationSchema}])
    ],
    controllers: [],
    providers: [ReservationService],
    exports: [ReservationService],
})
export class ReservationModule {}
