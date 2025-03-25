import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";
import {ID} from "../../../share/types/id.type";

export type THotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

	@Prop({ required: true, unique: true })
	title: string;

	@Prop()
	description: string;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ required: true })
	updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
