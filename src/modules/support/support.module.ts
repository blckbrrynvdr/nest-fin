import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestSchema } from './models/support-request.model';
import { MessageSchema } from './models/message.model';
import {SupportRequestService} from "./support-request.service";
import {SupportRequestClientService} from "./support-request-client.service";
import {SupportRequestEmployeeService} from "./support-request-employee.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'SupportRequest', schema: SupportRequestSchema },
            { name: 'Message', schema: MessageSchema }
        ]),
    ],
    providers: [
        SupportRequestService,
        SupportRequestClientService,
        SupportRequestEmployeeService,
    ],
    exports: [
        SupportRequestService,
        SupportRequestClientService,
        SupportRequestEmployeeService,
    ],
})
export class SupportModule {}
