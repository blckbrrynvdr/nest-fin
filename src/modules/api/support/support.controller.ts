import { Body, Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { AccessGuard } from 'src/guards/access.guard';
import { API_PREFIX } from '../../../share/constants/api.constant';
import { CreateSupportRequestDto, SupportRequestResponseDto } from './dto/create-support-request.dto';
import { GetSupportRequestsQueryDto } from './dto/get-support-requests.dto';
import { SupportRequestClientService } from 'src/modules/base/support/support-request-client.service';
import { SupportRequestService } from 'src/modules/base/support/support-request.service';
import { Request } from 'express';
import { User } from 'src/modules/base/user/models/user';

@Controller(API_PREFIX)
@UseGuards(AccessGuard)
export class SupportController {
    constructor(
        private readonly supportRequestClientService: SupportRequestClientService,
        private readonly supportRequestService: SupportRequestService
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
} 