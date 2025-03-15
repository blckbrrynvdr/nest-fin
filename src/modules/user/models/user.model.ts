import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ID} from "../../../share/types/id.type";


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    _id: ID;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    contactPhone?: string;

    @Prop({ default: 'client' })
    role: 'client' | 'admin' | 'manager';
}

export const UserSchema = SchemaFactory.createForClass(User);
