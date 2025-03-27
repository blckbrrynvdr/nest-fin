import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {ID} from "../../../../share/types/id.type";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({ required: true, type: Types.ObjectId })
    author: ID;

    @Prop({ required: true, default: new Date() })
    sentAt: Date;

    @Prop({ required: true })
    text: string;

    @Prop()
    readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
