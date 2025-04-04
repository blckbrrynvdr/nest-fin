import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from "../../base/support/support-request.service";
import { Message } from "../../base/support/models/message.model";
import { ID } from "../../../share/types/id.type";
import { UsersService } from "../../base/user/user.service";
import { ForbiddenException } from "@nestjs/common";
import { User } from "../../base/user/models/user";

interface AuthenticatedSocket extends Socket {
    user?: User;
}

@WebSocketGateway(80, {
    namespace: 'events',
    cors: {
        origin: '*',
    },
})
export class SupportGateway{

}
