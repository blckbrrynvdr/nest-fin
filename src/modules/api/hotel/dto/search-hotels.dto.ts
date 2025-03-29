import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchHotelsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @IsOptional()
    @IsString()
    title?: string;
} 