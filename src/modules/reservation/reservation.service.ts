import {Injectable} from "@nestjs/common";
import {IReservation, ReservationDto, ReservationSearchOptions} from "./interfaces/reservation.interface";
import {ReservationDocument, Reservation} from "./models/reservation";
import {Model, Promise, Types} from "mongoose";
import {ID} from "../../share/types/id.type";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ReservationService implements IReservation {
    constructor(
        @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
    ) {
    }
    async addReservation(data: ReservationDto): Promise<Reservation> {
        const reserved = await this.getReservations(data);
        if (reserved.length > 0) {
            return;
        }
        const createdReservation = new this.reservationModel({
            ...data,
            _id: new Types.ObjectId().toString(),
        });
        return createdReservation.save();
    }

    getReservations(filter: ReservationSearchOptions): Promise<Array<Reservation>> {
        return this.reservationModel.find({
            userId: filter.userId,
            dateStart: { $gte: filter.dateStart },
            dateEnd: { $lte: filter.dateEnd },
        }).exec();
    }

    removeReservation(id: ID): Promise<void> {
        this.reservationModel.deleteOne({_id: id});
        return;
    }

}
