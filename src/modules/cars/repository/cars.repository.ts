import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity';

export abstract class CarRepository {
  abstract create(data: CreateCarDto): Promise<Car> | Car | undefined;
  abstract findAll(): Promise<Car[]> | Car[] | undefined;
  abstract findOne(id: string): Promise<Car | undefined> | Car | undefined;
  abstract update(
    id: string,
    data: UpdateCarDto,
  ): Promise<Car> | Car | undefined;
  abstract delete(id: string): Promise<void> | void | undefined;
}
