import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {ID} from "../../../share/types/id.type";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({required: true, type: Types.ObjectId })
    userId: ID;

    @Prop({required: true, type: Types.ObjectId })
    hotelId: ID;

    @Prop({required: true, type: Types.ObjectId })
    roomId: ID;

    @Prop({required: true})
    dateStart: Date;

    @Prop({required: true})
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
