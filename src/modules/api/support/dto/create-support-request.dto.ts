import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSupportRequestDto {
    @IsString()
    @IsNotEmpty()
    text: string;
}

export class SupportRequestResponseDto {
    id: string;
    createdAt: string;
    isActive: boolean;
    hasNewMessages: boolean;
} 