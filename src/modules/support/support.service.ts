import {
    CreateSupportRequestDto,
    GetChatListParams,
    ISupportRequestClientService,
    ISupportRequestEmployeeService,
    ISupportRequestService,
    MarkMessagesAsReadDto,
    SendMessageDto
} from "./interfaces/support.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {SupportRequest, SupportRequestDocument} from "./models/support-request.model";
import {Message, MessageDocument} from "./models/message.model";
import {ID} from "src/share/types/id.type";
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export class SupportService implements ISupportRequestService, ISupportRequestClientService, ISupportRequestEmployeeService {
    constructor(
        @InjectModel('SupportRequest') private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
    ) {
    }

    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        const query: any = {};

        query.isActive = params.isActive;

        if (params.user) {
            query.user = params.user;
        }

        return this.supportRequestModel.find(query).exec();
    }
    sendMessage(data: SendMessageDto): Promise<Message> {
        throw new Error("Method not implemented.");
    }
    getMessages(supportRequest: ID): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        throw new Error("Method not implemented.");
    }

    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        throw new Error("Method not implemented.");
    }

    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUnreadCount(supportRequest: ID): Promise<number> {
        throw new Error("Method not implemented.");
    }
    closeRequest(supportRequest: ID): Promise<void> {
        throw new Error("Method not implemented.");
    }


}
