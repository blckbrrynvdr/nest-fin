import {Injectable} from '@nestjs/common';
import {UserModel, UserDocument} from './models/user.model';
import {CreateUserDto} from './dto/create-user.dto';
import {IUserService, SearchUserParams} from "./interfaces/user.interface";
import {ID} from "../../share/types/id.type";
import * as bcrypt from 'bcryptjs';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model, Types} from "mongoose";


@Injectable()
export class UsersService implements IUserService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {
    }

    async create(data: CreateUserDto): Promise<UserDocument> {
        console.log('userService create data', data)
        const userData: Partial<UserModel> = {
            ...data,
            _id: new Types.ObjectId().toString(),
            passwordHash: await this.generatePasswordHash(data.password),
        };
        console.log('userService create userData', userData)
        const createdUser = new this.userModel(userData);
        return createdUser.save();

    }

    async findById(id: ID): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({email}).exec();
    }

    async findAll(searchParams: SearchUserParams): Promise<UserDocument[]> {
        const query = {};
        if (searchParams.email) {
            query['email'] = {$regex: searchParams.email, $options: 'i'};
        }
        if (searchParams.name) {
            query['name'] = {$regex: searchParams.name, $options: 'i'};
        }
        if (searchParams.contactPhone) {
            query['contactPhone'] = {$regex: searchParams.contactPhone, $options: 'i'};
        }
        return this.userModel.find(query).exec();
    }

    private async generatePasswordHash(password: string) {
        const salt = 10;
        return await bcrypt.hash(password, salt);
    }
}
