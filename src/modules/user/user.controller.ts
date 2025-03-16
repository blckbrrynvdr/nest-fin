import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserParams } from './interfaces/user.interface';
import {ID} from "../../share/types/id.type";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        console.log('user controller createUserDto', createUserDto)
        return await this.usersService.create(createUserDto);
    }

    @Get(':id')
    async findById(@Param('id') id: ID) {
        return await this.usersService.findById(id);
    }

    @Get('/email/:email')
    async findByEmail(@Param('email') email: string) {
        return await this.usersService.findByEmail(email);
    }

    @Get()
    async findAll(@Query() searchParams: SearchUserParams) {
        return await this.usersService.findAll(searchParams);
    }
}
