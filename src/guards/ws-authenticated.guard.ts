import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import {TRole} from "../modules/base/user/types/user.type";
import {Reflector} from "@nestjs/core";

@Injectable()
export class WsAuthenticatedGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }
    async canActivate(context: ExecutionContext) {
        const client = context.switchToWs().getClient();
        const roleName = this.reflector.get<string[]>('roleName', context.getHandler());
        console.log('WS AuthenticatedGuard roleName', roleName)

        const sessions = Object.values(client.request['sessionStore']['sessions'])[0];
        if (!sessions) {
            console.log('WS AuthenticatedGuard !sessions', sessions);
            return false;
        }
        const sessionParse = JSON.parse(sessions as string);

        const user = sessionParse?.passport?.user;
        if (!user) {
            console.log('WS AuthenticatedGuard !user', !user);
            return false;
        }

        if(!roleName.includes(user.role)) {
            return false;
        }

        console.log('WS AuthenticatedGuard sessions4', user);
        return true
    }
}
