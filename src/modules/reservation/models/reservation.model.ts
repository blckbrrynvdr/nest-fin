import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {ID} from "../../../share/types/id.type";

export type ReservationDocument = ReservationModel & Document;

@Schema()
export class ReservationModel {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({required: true})
    userId: ID;

    @Prop({required: true})
    hotelId: ID;

    @Prop({required: true})
    roomId: ID;

    @Prop({required: true})
    dateStart: Date;

    @Prop({required: true})
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel);
