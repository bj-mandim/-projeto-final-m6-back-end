import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarRepository } from './repository/cars.repository';
import { CarInMemoryRepository } from './repository/in-memory/cars.in-memory.repository';

@Module({
  controllers: [CarsController],
  providers: [
    CarsService,
    { provide: CarRepository, useClass: CarInMemoryRepository },
  ],
})
export class CarsModule {}
