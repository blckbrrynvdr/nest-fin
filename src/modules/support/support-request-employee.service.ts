import {Injectable} from "@nestjs/common";
import {ISupportRequestEmployeeService, MarkMessagesAsReadDto} from "./interfaces/support.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {SupportRequestDocument} from "./models/support-request.model";
import {MessageDocument} from "./models/message.model";

@Injectable()
export class SupportRequestEmployeeService implements ISupportRequestEmployeeService {
    constructor(
        @InjectModel('SupportRequest') private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
    ) {
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        const { user, supportRequest, createdBefore } = params;

        await this.messageModel.updateMany({
            supportRequest,
            author: user, // Сообщения от пользователя
            sentAt: { $lte: createdBefore },
            readAt: null
        }, {
            readAt: new Date()
        }).exec();
    }

    async getUnreadCount(supportRequest: string): Promise<number> {
        const {messages, user} = await this.supportRequestModel.findById(supportRequest).exec();
        const clientMessages = messages.filter((message) => {
            return message.author === user && message.readAt !== null;
        });
        return clientMessages.length;
    }

    async closeRequest(supportRequest: string): Promise<void> {
        await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
            isActive: false
        });
    }
}
