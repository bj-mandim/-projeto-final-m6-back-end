import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private repository: Repository<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    createCarDto.fipe_table = Number(createCarDto.fipe_table);
    createCarDto.price = Number(createCarDto.price);
    return this.repository.save(createCarDto);
  }

  async findAll(): Promise<Car[]> {
    const list = await this.repository.find();
    return list;
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { id } });

    if (!car) {
      throw new Error(`Car not found`);
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.findOne(id);

    await this.repository.update({ id }, updateCarDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
