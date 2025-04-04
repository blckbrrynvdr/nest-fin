import * as express from 'express';
import {IoAdapter} from "@nestjs/platform-socket.io";
import {Server, ServerOptions} from "socket.io";
import * as passport from 'passport';
import {INestApplicationContext} from "@nestjs/common";

export class SessionAdapter extends IoAdapter {
    private session: express.RequestHandler;

    constructor(session: express.RequestHandler, app: INestApplicationContext) {
        super(app);
        this.session = session;
    }

    create(port: number, options?: ServerOptions): Server {
        const server: Server = super.create(port, options);

        const wrap = (middleware) => (socket, next) =>
            middleware(socket.request, {}, next);

        server.use((socket, next) => {
            socket.data.username = 'test'; //passing random property to see if use method is working
            next();
        });

        server.use(wrap(this.session));
        server.use(wrap(passport.initialize()));
        server.use(wrap(passport.session()));
        return server;
    }
}
