import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        // TODO сделать на базе этого roles guard
        console.log('AuthenticatedGuard request.user', request.user);
        console.log('AuthenticatedGuard request.isAuthenticated()', request.isAuthenticated());
        return request.isAuthenticated()
    }
}
