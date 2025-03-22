import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {TRole} from "../types/user.type";

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
    // @Prop({ required: true, type: String })
    // _id: string | ID;

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

export const UserSchema = SchemaFactory.createForClass(UserModel);
