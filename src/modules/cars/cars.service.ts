import { Injectable, NotFoundException } from '@nestjs/common';
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

    const car = this.repository.create(createCarDto);
    await this.repository.save(car);

    await this.createImg(createCarDto.images, car.id);

    return await this.findOne(car.id);
  }

  async findAll(): Promise<Car[]> {
    const list = await this.repository.find();

    return list;
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.repository
      .createQueryBuilder('car')
      .where('car.id = :id_car', { id_car: id })
      .leftJoinAndSelect('car.images', 'images')
      .getOne();

    if (!car) {
      throw new NotFoundException(`Car not found`);
    }

    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    if (updateCarDto.images) {
      delete updateCarDto.images;
    }

    await this.repository.update({ id }, updateCarDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }

  async createImg(images: ImageDto[], carId: string): Promise<Image[]> {
    const car = await this.findOne(carId);

    const imagesList = images.map((image) =>
      this.imgRepository.create({ ...image, car: car }),
    );
    await this.imgRepository.save(imagesList);

    return await this.imgRepository
      .createQueryBuilder('images')
      .where('images.car.id = :id_car', { id_car: carId })
      .getMany();
  }

  async removeImg(id: string): Promise<void> {
    const image = await this.imgRepository
      .createQueryBuilder('images')
      .where('images.id = :id_image', { id_image: id })
      .getOne();

    if (!image) {
      throw new NotFoundException(`Image not found`);
    }
    await this.imgRepository.delete({ id });
  }
}
