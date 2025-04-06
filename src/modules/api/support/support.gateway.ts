import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
    WebSocketServer, OnGatewayInit
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SetMetadata, UseGuards} from "@nestjs/common";
import {AuthenticatedGuard} from "../../../guards/authenticated.guard";
import {MemoryStore} from "express-session";
import {WsAuthenticatedGuard} from "../../../guards/ws-authenticated.guard";
import {SupportRequestDocument} from "../../base/support/models/support-request.model";
import {MessageDocument} from "../../base/support/models/message.model";
import {SupportRequestService} from "../../base/support/support-request.service";
import {UsersService} from "../../base/user/user.service";

@WebSocketGateway({ cors: true, credentials: true, })
export class SupportGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly supportRequestService: SupportRequestService,
        private readonly usersService: UsersService
    ) {
        console.log('server', this.server)
    }

    afterInit(server: any): any {
        console.log('after init server', server)
    }

    @UseGuards(WsAuthenticatedGuard)
    @SetMetadata('roleName', ['client', 'manager'])
    @SubscribeMessage('subscribeToChat')
    async subscribeToChat(
        @MessageBody() chatId: string,
        @ConnectedSocket() client: Socket,
    ) {
        const handler = (
            supportRequest: SupportRequestDocument,
            message: MessageDocument,
        ) => {
            const sessions = Object.values(client.request['sessionStore']['sessions'])[0];
            const sessionParse = JSON.parse(sessions as string);
            const user = sessionParse?.passport?.user;
            const supportRequestId = supportRequest._id.toString();

            this.server
                .to(`support-request-${supportRequestId}`)
                .emit('new message', message);
        };

        this.supportRequestService.subscribe(handler);

        this.server.emit(
            'subscribed',
            `Chat id: ${chatId}`,
        );
    }
}
