import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarRepository } from './repository/cars.repository';
import { CarInMemoryRepository } from './repository/in-memory/cars.in-memory.repository';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [
    CarsService,
    { provide: CarRepository, useClass: CarInMemoryRepository },
  ],
})
export class CarsModule {}
