import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto, ImageDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { Image } from './entities/image.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private repository: Repository<Car>,
    @InjectRepository(Image) private imgRepository: Repository<Image>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    createCarDto.fipe_table = Number(createCarDto.fipe_table);

    createCarDto.price = Number(createCarDto.price);

    let car = this.repository.create(createCarDto);
    await this.repository.save(car);

    // createCarDto.images.forEach(async (image) => {
    //   const createdImg = this.imgRepository.create({ ...image, car: car });
    //   const test = await this.imgRepository.save(createdImg);
    //   console.log(test.id);
    // });

    await this.createImg(createCarDto.images, car).then(async () => {
      car = await this.findOne(car.id);
    });
    return car;
  }

  async createImg(images: ImageDto[], car: Car): Promise<void> {
    images.forEach((image) => {
      const createdImg = this.imgRepository.create({ ...image, car: car });
      this.imgRepository.save(createdImg);
    });
  }

  async findAll(): Promise<Car[]> {
    const list = await this.repository.find();
    return list;
  }

  async findOne(id: string): Promise<Car> {
    // const car = await this.repository.findOne({ where: { id } });

    const car = await this.repository
      .createQueryBuilder('car')
      .where('car.id = :id_car', { id_car: id })
      .leftJoinAndSelect('car.images', 'images')
      .getOne();

    if (!car) {
      throw new Error(`Car not found`);
    }

    console.log(car.id);

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
