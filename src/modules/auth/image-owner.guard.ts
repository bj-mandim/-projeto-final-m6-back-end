import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class ImageOwnerGuard implements CanActivate {
  constructor(private carsService: CarsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const image = await this.carsService.findImage(request.params.id);

    return image.car.user.id == request.user.userId;
  }
}
