import { Injectable } from '@nestjs/common';
import {Model, Schema} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findById(id: Schema.Types.ObjectId): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(searchParams: any): Promise<UserDocument[]> {
        // Реализация поиска с учетом частичного совпадения полей
        const query = {};
        if (searchParams.email) {
            query['email'] = { $regex: searchParams.email, $options: 'i' };
        }
        if (searchParams.name) {
            query['name'] = { $regex: searchParams.name, $options: 'i' };
        }
        if (searchParams.contactPhone) {
            query['contactPhone'] = { $regex: searchParams.contactPhone, $options: 'i' };
        }
        return this.userModel.find(query).exec();
    }
}
