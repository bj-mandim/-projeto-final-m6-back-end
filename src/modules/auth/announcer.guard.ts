import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AnnouncerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.user.isAnnouncer == false) {
      throw new UnauthorizedException('You dont have permission');
    }
    return request.user.isAnnouncer;
  }
}
