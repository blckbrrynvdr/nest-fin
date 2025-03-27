import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {SupportRequest, SupportRequestDocument} from './models/support-request.model';
import {Message, MessageDocument} from './models/message.model';
import {EventEmitter} from 'events';
import {GetChatListParams, ISupportRequestService, SendMessageDto} from "./interfaces/support.interface";
import {ID} from "../../../share/types/id.type";

const eventEmitter = new EventEmitter();

@Injectable()
export class SupportRequestService implements ISupportRequestService {
    constructor(
        @InjectModel('SupportRequest') private readonly supportRequestModel: Model<SupportRequestDocument>,
        @InjectModel('Message') private readonly messageModel: Model<MessageDocument>
    ) {}

    async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        const query: any = {};

        query.isActive = params.isActive;

        if (params.user) {
            query.user = params.user;
        }

        return this.supportRequestModel.find(query).exec();
    }

    async getMessages(supportRequest: ID): Promise<Message[]> {
        const result = await this.supportRequestModel.findById(supportRequest)
            .populate('messages')
            .select('messages')
            .exec();

        return result.messages;
    }

    async sendMessage(data: SendMessageDto): Promise<Message> {
        const message = new this.messageModel({
            author: data.author,
            supportRequest: data.supportRequest,
            text: data.text
        });

        await message.save();

        await this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
            $push: { messages: message._id }
        });

        this.emitNewMessage(await this.supportRequestModel.findById(data.supportRequest), message);

        return message;
    }

    subscribe(handler: (supportRequest: SupportRequestDocument, message: MessageDocument) => void): () => void {
        eventEmitter.on('new_message', handler);
        return () => {
            eventEmitter.off('new_message', handler);
        };
    }

    emitNewMessage(supportRequest: SupportRequestDocument, message: MessageDocument) {
        eventEmitter.emit('new_message', supportRequest, message);
    }
}
