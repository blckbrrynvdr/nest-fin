import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import { TRole } from "src/modules/base/user/types/user.type";

@Injectable()
export class AccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const path = request.url;
        const user = request.user;

        if (path.startsWith('/api/common')) {
            return true;
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        const userRole: TRole = user.role;

        if (path.startsWith('/api/admin')) {
            return userRole === 'admin';
        }

        if (path.startsWith('/api/manager')) {
            return userRole === 'manager';
        }

        if (path.startsWith('/api/client')) {
            return userRole === 'client';
        }

        return false;
    }
}
