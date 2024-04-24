import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.decode(token);
            const user = payload.user._doc
            if (!user || !user.role) {
                throw new UnauthorizedException('Invalid user role');
            }
            request.user = payload;
            // Check if user role is allowed to access the endpoint
            const allowedRoles = this.getRolesFromDecorator(context);
            console.log(allowedRoles)
            if (!allowedRoles.includes(payload.user._doc.role)) {
                throw new UnauthorizedException('Insufficient user role');
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private getRolesFromDecorator(context: ExecutionContext): string[] {
        const roles = Reflect.getMetadata('roles', context.getHandler());
        return roles ? roles : [];
    }
}