import {Injectable} from "@nestjs/common";
import {
    CreateSupportRequestDto,
    ISupportRequestClientService,
    MarkMessagesAsReadDto
} from "./interfaces/support.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {SupportRequest, SupportRequestDocument} from "./models/support-request.model";
import {MessageDocument} from "./models/message.model";
import {ID} from "../../../share/types/id.type";

@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {
    constructor(
        @InjectModel('SupportRequest') private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel('Message') private readonly messageModel: Model<MessageDocument>,
    ) {
    }

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        const supportRequest = new this.supportRequestModel({
            user: data.user,
            messages: [{ author: data.user, text: data.text }]
        });
        return supportRequest.save();
    }

    async getUnreadCount(supportRequest: ID): Promise<number> {
        const {messages, user} = await this.supportRequestModel.findById(supportRequest).exec();
        const employeeMessages = messages.filter((message) => {
            return message.author !== user && message.readAt !== null;
        });
        return employeeMessages.length;
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        const { user, supportRequest, createdBefore } = params;

        await this.messageModel.updateMany({
            supportRequest,
            author: { $ne: user }, // Сообщения от сотрудников поддержки?
            sentAt: { $lte: createdBefore },
            readAt: null
        }, {
            readAt: new Date()
        }).exec();
    }

}
