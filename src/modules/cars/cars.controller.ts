import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto, ImageListDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
// import { CarSchema } from 'src/schemas/car.schema';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Post(':id/images')
  createImg(@Body() imageListDto: ImageListDto, @Param('id') id: string) {
    return this.carsService.createImg(imageListDto.images, id);
  }

  @Delete('/images/:id')
  deleteImg(@Param('id') id: string) {
    return this.carsService.removeImg(id);
  }
}
