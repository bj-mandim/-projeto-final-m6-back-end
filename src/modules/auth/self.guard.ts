import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.params.id == request.user.userId;
  }
}
