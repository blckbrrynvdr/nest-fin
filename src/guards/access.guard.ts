import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import { TRole } from "src/modules/base/user/types/user.type";

@Injectable()
export class AccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const path = request.url;
        const user = request.user;
        console.log('AccessGuard')

        if (path.startsWith('/api/common')) {
            return true;
        }

        // Если пользователь не аутентифицирован
        if (!user) {
            console.log('AccessGuard no auth')
            throw new UnauthorizedException();
        }

        // Проверяем роль пользователя
        const userRole: TRole = user.role;

        // Для путей /api/admin нужна роль admin
        if (path.startsWith('/api/admin')) {
            return userRole === 'admin';
        }

        // Для путей /api/manager нужна роль manager или admin
        if (path.startsWith('/api/manager')) {
            return userRole === 'manager';
        }

        if (path.startsWith('/api/client')) {
            return userRole === 'client';
        }

        return false;
    }
}
