import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { User, UserDocument, UserSchema } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import {IUserService, SearchUserParams} from "./interfaces/user.interface";
import {ID} from "../../share/types/id.type";
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService implements IUserService{
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async create(data: CreateUserDto): Promise<UserDocument> {
        console.log('userService create data', data)
        const userData: Partial<User> = {
            ...data,
            passwordHash: await this.generatePasswordHash(data.password),
        };
        return this.usersRepository.create(userData);
    }

    async findById(id: ID): Promise<UserDocument> {
        return this.usersRepository.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.usersRepository.findByEmail(email);
    }

    async findAll(searchParams: SearchUserParams): Promise<UserDocument[]> {
        return this.usersRepository.findAll(searchParams);
    }

    private async generatePasswordHash(password: string) {
        const salt = 10;
        return await bcrypt.hash(password, salt);
    }
}
