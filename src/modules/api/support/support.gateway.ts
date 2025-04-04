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
        console.log('after initr server', server)
    }

    @SubscribeMessage('hello')
    handleHelloMessage(client: any, payload: any): string {
        console.log('handleHelloMessage', payload)
        return 'Hello world!';
    }

    @UseGuards(WsAuthenticatedGuard)
    @SetMetadata('roleName', ['client', 'manager'])
    @SubscribeMessage('test')
    handleTestMessage(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): string {

        console.log('handleTestMessage clienclientrequest.sessionStore.sessions Object.values', Object.values(client.request['sessionStore']['sessions'])[0]);
        const sessions = Object.values(client.request['sessionStore']['sessions'])[0];
        const sessionParse = JSON.parse(sessions as string);
        const user = sessionParse?.passport?.user;

        // нужен ключ passport

        // const store = new MemoryStore();
        //
        // store.get(client.request['sessionID'], (err, sess) => {
        //     console.log('STORAGE err', err)
        //     console.log('STORAGE sess', sess)
        // })

        return data
    }

    @UseGuards(WsAuthenticatedGuard)
    @SetMetadata('roleName', ['client', 'manager'])
    @SubscribeMessage('subscribeToChat')
    async subscribeToChat(@MessageBody() chatId: string) {
        const handler = (
            supportRequest: SupportRequestDocument,
            message: MessageDocument,
        ) => {
            const supportRequestId = supportRequest._id.toString();
            this.server
                .to(`support-request-${supportRequestId}`)
                .emit('new message', message);
        };

        this.supportRequestService.subscribe(handler);

        this.server.emit(
            'subscription result',
            `You have subscribed to messages from chat ${chatId}`,
        );
    }

    @SubscribeMessage('message')
    handleMessage(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): string {
        console.log('handleMessage data', data)
        console.log('handleMessage client', client)
        console.log('handleMessage client.user', client['user'])
        return data
    }
    @SubscribeMessage('events')
    onEvent(): Observable<WsResponse<number>> {
        console.log('evenyts')
        const event = 'events';
        const response = [1, 2, 3];
        return from(response).pipe(
            map(data => ({ event, data })),
        );
    }
    @SubscribeMessage('server')
    onEventWithServer() {
        console.log('onEventWithServer', this.server.sockets);
        return 'OK';
    }
}
