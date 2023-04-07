import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarRepository } from './repository/cars.repository';

@Injectable()
export class CarsService {
  constructor(private carsRepository: CarRepository) {}
  create(createCarDto: CreateCarDto) {
    return this.carsRepository.create(createCarDto);
  }

  findAll() {
    return this.carsRepository.findAll();
  }

  findOne(id: string) {
    return this.carsRepository.findOne(id);
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carsRepository.update(id, updateCarDto);
  }

  remove(id: string) {
    return this.carsRepository.delete(id);
  }
}
