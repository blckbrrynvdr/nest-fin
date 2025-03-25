import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ID} from "../../../share/types/id.type";
import {Document, Types} from "mongoose";

export type IHotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({required: true, unique: true})
    title: string;

    @Prop({required: true, type: Types.ObjectId, ref: 'HotelModel'})
    hotel: ID;

    @Prop()
    description: string;

    @Prop({default: []})
    images: string[];

    @Prop({required: true})
    createdAt: Date;

    @Prop({required: true})
    updatedAt: Date;

    @Prop({required: true, default: true})
    isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
