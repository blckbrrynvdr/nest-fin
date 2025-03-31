import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportModule as BaseSupportModule } from 'src/modules/base/support/support.module';

@Module({
    imports: [BaseSupportModule],
    controllers: [SupportController],
})
export class SupportApiModule {} 