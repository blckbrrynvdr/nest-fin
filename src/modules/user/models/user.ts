import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {TRole} from "../types/user.type";
import {ID} from "../../../share/types/id.type";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true, type: Types.ObjectId })
    _id: ID;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    passwordHash: string;

    @Prop({required: true})
    name: string;

    @Prop()
    contactPhone?: string;

    @Prop({default: 'client'})
    role: TRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
