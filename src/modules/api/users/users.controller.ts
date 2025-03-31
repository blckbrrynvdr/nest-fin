import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/guards/access.guard';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { GetUsersQueryDto, UserListItemDto } from './dto/get-users.dto';
import { UsersService } from 'src/modules/base/user/user.service';
import { SearchUserParams } from 'src/modules/base/user/interfaces/user.interface';
import { API_PREFIX } from "../../../share/constants/api.constant";

@Controller(API_PREFIX)
@UseGuards(AccessGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        const user = await this.userService.create(createUserDto);
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
            role: user.role
        };
    }

    @Get(['admin/users', 'manager/users'])
    async getUsersForAdmin(@Query() query: GetUsersQueryDto): Promise<UserListItemDto[]> {
        const searchParams: SearchUserParams = {
            limit: query.limit || 10,
            offset: query.offset || 0,
            name: query.name,
            email: query.email,
            contactPhone: query.contactPhone
        };
        
        const users = await this.userService.findAll(searchParams);
        return users.map(user => ({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
        }));
    }
} 
