import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class CarOwnerGuard implements CanActivate {
  constructor(private carsService: CarsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const car = await this.carsService.findOne(request.params.id);
    if (car.user.id != request.user.userId) {
      throw new UnauthorizedException('This car is not yours');
    }

    return car.user.id == request.user.userId;
  }
}
