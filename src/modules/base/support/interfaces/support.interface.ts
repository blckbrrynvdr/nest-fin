import {ID} from "../../../../share/types/id.type";
import {SupportRequest} from "../models/support-request.model";
import {Message} from "../models/message.model";

export interface CreateSupportRequestDto {
    user: ID;
    text: string;
}

export interface SendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}

export interface MarkMessagesAsReadDto {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
}

// по ТЗ из 1 раздела ограничений нет, но в 2 разделе они указаны как параметры запроса
// поэтому я добавил их сюда
export interface GetChatListParams {
    user: ID | null;
    isActive: boolean;
    limit?: number;
    offset?: number;
}

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void
    ): () => void;
}

export interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
    getUnreadCount(supportRequest: ID): Promise<number>;
}

export interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
    getUnreadCount(supportRequest: ID): Promise<number>;
    closeRequest(supportRequest: ID): Promise<void>;
}
