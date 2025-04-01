import { Body, Controller, Get, Param, Post, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AccessGuard } from 'src/guards/access.guard';
import { API_PREFIX } from '../../../share/constants/api.constant';
import { CreateSupportRequestDto, SupportRequestResponseDto } from './dto/create-support-request.dto';
import { GetSupportRequestsQueryDto } from './dto/get-support-requests.dto';
import { GetManagerSupportRequestsQueryDto, ManagerSupportRequestResponseDto } from './dto/get-manager-support-requests.dto';
import { MessageResponseDto } from './dto/get-messages.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MarkMessagesReadDto } from './dto/mark-messages-read.dto';
import { SupportRequestClientService } from 'src/modules/base/support/support-request-client.service';
import { SupportRequestService } from 'src/modules/base/support/support-request.service';
import { SupportRequestEmployeeService } from 'src/modules/base/support/support-request-employee.service';
import { UsersService } from 'src/modules/base/user/user.service';
import { Request } from 'express';
import { User } from 'src/modules/base/user/models/user';

@Controller(API_PREFIX)
@UseGuards(AccessGuard)
export class SupportController {
    constructor(
        private readonly supportRequestClientService: SupportRequestClientService,
        private readonly supportRequestService: SupportRequestService,
        private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
        private readonly usersService: UsersService
    ) {}

    @Post('client/support-requests')
    async createSupportRequest(
        @Body() createSupportRequestDto: CreateSupportRequestDto,
        @Req() req: Request & { user: User }
    ): Promise<SupportRequestResponseDto> {
        const supportRequest = await this.supportRequestClientService.createSupportRequest({
            ...createSupportRequestDto,
            user: req.user._id
        });
        return {
            id: supportRequest._id.toString(),
            createdAt: supportRequest.createdAt.toISOString(),
            isActive: supportRequest.isActive,
            hasNewMessages: false
        };
    }

    @Get('client/support-requests')
    async getSupportRequests(
        @Query() query: GetSupportRequestsQueryDto,
        @Req() req: Request & { user: User }
    ): Promise<SupportRequestResponseDto[]> {
        const supportRequests = await this.supportRequestService.findSupportRequests({
            user: req.user._id,
            isActive: query.isActive,
            limit: query.limit,
            offset: query.offset
        });

        return supportRequests.map(request => ({
            id: request._id.toString(),
            createdAt: request.createdAt.toISOString(),
            isActive: request.isActive,
            hasNewMessages: false
        }));
    }

    @Get('manager/support-requests')
    async getManagerSupportRequests(
        @Query() query: GetManagerSupportRequestsQueryDto
    ): Promise<ManagerSupportRequestResponseDto[]> {
        const supportRequests = await this.supportRequestService.findSupportRequests({
            user: null,
            isActive: query.isActive,
            limit: query.limit,
            offset: query.offset
        });

        const result = await Promise.all(supportRequests.map(async request => {
            const client = await this.usersService.findById(request.user);
            return {
                id: request._id.toString(),
                createdAt: request.createdAt.toISOString(),
                isActive: request.isActive,
                hasNewMessages: false,
                client: {
                    id: client._id.toString(),
                    name: client.name,
                    email: client.email,
                    contactPhone: client.contactPhone
                }
            };
        }));

        return result;
    }

    @Get('common/support-requests/:id/messages')
    async getMessages(
        @Param('id') id: string,
        @Req() req: Request & { user: User }
    ): Promise<MessageResponseDto[]> {
        const supportRequest = await this.supportRequestService.findSupportRequests({
            user: req.user.role === 'client' ? req.user._id : null,
            isActive: true
        }).then(tickets => tickets.find(ticket => ticket._id.toString() === id));

        if (!supportRequest) {
            throw new Error('Support request not found or access denied');
        }

        const messages = await this.supportRequestService.getMessages(id);
        const result = await Promise.all(messages.map(async message => {
            const author = await this.usersService.findById(message.author);
            // не добавлял createdAt так как в модели его нет, а модель сделана по ТЗ
            return {
                id: message._id.toString(),
                text: message.text,
                readAt: message.readAt?.toISOString(),
                author: {
                    id: author._id.toString(),
                    name: author.name
                }
            };
        }));

        return result;
    }

    @Post('common/support-requests/:id/messages')
    async sendMessage(
        @Param('id') id: string,
        @Body() sendMessageDto: SendMessageDto,
        @Req() req: Request & { user: User }
    ): Promise<MessageResponseDto[]> {
        const supportRequest = await this.supportRequestService.findSupportRequests({
            user: req.user.role === 'client' ? req.user._id : null,
            isActive: true
        }).then(tickets => tickets.find(ticket => ticket._id.toString() === id));

        if (!supportRequest) {
            throw new ForbiddenException('Support request not found or access denied');
        }

        const message = await this.supportRequestService.sendMessage({
            supportRequest: id,
            text: sendMessageDto.text,
            author: req.user._id
        });

        const author = await this.usersService.findById(message.author);
        return [{
            id: message._id.toString(),
            text: message.text,
            readAt: message.readAt?.toISOString(),
            author: {
                id: author._id.toString(),
                name: author.name
            }
        }];
    }

    @Post('common/support-requests/:id/messages/read')
    async markMessagesAsRead(
        @Param('id') id: string,
        @Body() markMessagesReadDto: MarkMessagesReadDto,
        @Req() req: Request & { user: User }
    ): Promise<{ success: true }> {
        const supportRequest = await this.supportRequestService.findSupportRequests({
            user: req.user.role === 'client' ? req.user._id : null,
            isActive: true
        }).then(tickets => tickets.find(ticket => ticket._id.toString() === id));

        if (!supportRequest) {
            throw new ForbiddenException('Support request not found or access denied');
        }

        const service = req.user.role === 'client' 
            ? this.supportRequestClientService 
            : this.supportRequestEmployeeService;

        await service.markMessagesAsRead({
            supportRequest: id,
            createdBefore: new Date(markMessagesReadDto.createdBefore),
            user: req.user._id
        });

        return { success: true };
    }
} 