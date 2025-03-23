import {ID} from "../../../share/types/id.type";
import {ReservationModel} from "../models/reservation.model";

export interface ReservationDto {
    userId: ID;
    hotelId: ID;
    roomId: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface ReservationSearchOptions {
    userId: ID;
    dateStart: Date;
    dateEnd: Date;
}
export interface IReservation {
    addReservation(data: ReservationDto): Promise<ReservationModel>;
    removeReservation(id: ID): Promise<void>;
    getReservations(
        filter: ReservationSearchOptions
    ): Promise<Array<ReservationModel>>;
}
