import { CreateCarDto } from '../../dto/create-car.dto';
import { UpdateCarDto } from '../../dto/update-car.dto';
import { Car } from '../../entities/car.entity';
import { CarRepository } from '../cars.repository';
import { cars } from 'src/database/db';

export class CarInMemoryRepository implements CarRepository {
  create(data: CreateCarDto): Car | Promise<Car> {
    const newCar = new Car();
    Object.assign(newCar, { ...data });
    cars.push(newCar);
    return newCar;
  }
  findAll(): Car[] | Promise<Car[]> {
    return cars;
  }

  findOne(id: string): Car | Promise<Car> {
    const car = cars.find((car) => car.id == id);
    return car;
  }

  update(id: string, data: UpdateCarDto): Car | Promise<Car> {
    const carIndex = cars.findIndex((car) => car.id == id);
    cars[carIndex] = { ...cars[carIndex], ...data };
    return cars[carIndex];
  }

  delete(id: string): void | Promise<void> {
    const carIndex = cars.findIndex((car) => car.id == id);
    cars.splice(carIndex, 1);
  }
}
