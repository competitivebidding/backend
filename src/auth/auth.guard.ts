import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { SetMetadata } from '@nestjs/common';

// @Public decorator to decorate routs that don't need the user to be authorized
export const Public = () => SetMetadata('isPublic', true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // If the route is marked with @Public, skip token verification and return true
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );
    if (isPublic) {
      return true;
    }

    // If there is no token, or the token is invalid, return false
    const request: Request = context.switchToHttp().getRequest();
    const token = this.authService.validateRequestToken(request)
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization Header')
    }
    const user = this.authService.verifyRequestToken(token)
    if (!user) {
      throw new UnauthorizedException('Invalid Token')
    }

    // Modify the request with the user's email, because it could be needed in business logic later
    request['user'] = user;
    return true;
  }
}
