import { IsOptional, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class GetManagerSupportRequestsQueryDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isActive?: boolean;
}

export class ClientInfoDto {
    id: string;
    name: string;
    email: string;
    contactPhone: string;
}

export class ManagerSupportRequestResponseDto {
    id: string;
    createdAt: string;
    isActive: boolean;
    hasNewMessages: boolean;
    client: ClientInfoDto;
} 