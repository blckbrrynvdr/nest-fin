import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserDocument } from '../models/user.model';
import { ID } from '../../../share/types/id.type';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(UserModel.name)
        private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: Partial<UserModel>): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findById(id: ID): Promise<UserDocument> {
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
