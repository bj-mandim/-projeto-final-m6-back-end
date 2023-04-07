import { Injectable } from '@nestjs/common';
import { CreateCarDto } from '../../dto/create-car.dto';
import { UpdateCarDto } from '../../dto/update-car.dto';
import { Car } from '../../entities/car.entity';

@Injectable()
export class CarsInMemoryRepository implements CarsRepository {
  create(data: CreateCarDto): Car | Promise<Car> {}

  findOne(id: string): Car | Promise<Car> {}

  findAll(): Promise<Car[]> | Car[] {}

  update(id: string, data: UpdateCarDto): Car | Promise<Car> {}

  delete(id: string): void | Promise<void> {}
}
