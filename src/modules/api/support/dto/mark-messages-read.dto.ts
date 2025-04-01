import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class MarkMessagesReadDto {
    @IsString()
    @IsNotEmpty()
    @IsISO8601()
    createdBefore: string;
} 