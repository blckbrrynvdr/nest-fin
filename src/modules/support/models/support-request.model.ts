import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { Message } from './message.model';
import {ID} from "../../../share/types/id.type";

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({required: true, type: Types.ObjectId })
    user: ID;

    @Prop({ required: true, default: new Date() })
    createdAt: Date;

    @Prop([Message])
    messages: Message[];

    @Prop({ default: true })
    isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
