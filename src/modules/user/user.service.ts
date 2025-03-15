import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserParams } from './interfaces/search-user-params.interface';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        return this.usersRepository.create(createUserDto);
    }

    async findById(id: string): Promise<UserDocument> {
        return this.usersRepository.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.usersRepository.findByEmail(email);
    }

    async findAll(searchParams: SearchUserParams): Promise<UserDocument[]> {
        return this.usersRepository.findAll(searchParams);
    }
}
