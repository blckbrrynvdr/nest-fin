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

        const sessions = Object.values(client.request['sessionStore']['sessions'])[0];
        if (!sessions) {
            return false;
        }
        const sessionParse = JSON.parse(sessions as string);

        const user = sessionParse?.passport?.user;
        if (!user) {
            return false;
        }

        if(!roleName.includes(user.role)) {
            return false;
        }

        return true
    }
}
