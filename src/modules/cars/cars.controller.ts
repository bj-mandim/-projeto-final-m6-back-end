import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto, ImageListDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AnnouncerGuard } from '../auth/announcer.guard';

interface iTokenRequest extends Request {
  userId: string;
  isAnnouncer: boolean;
}

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(TokenAuthGuard, AnnouncerGuard)
  create(@Body() createCarDto: CreateCarDto, @Request() req: iTokenRequest) {
    const userId = req.userId;
    // const userId = '4ac3b570-351b-4077-ae74-356007249ff0';
    return this.carsService.create(createCarDto, userId);
  }

  @Get()
  @UseGuards(TokenAuthGuard)
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenAuthGuard)
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Post(':id/images')
  @UseGuards(TokenAuthGuard)
  createImg(@Body() imageListDto: ImageListDto, @Param('id') id: string) {
    return this.carsService.createImg(imageListDto.images, id);
  }

  @Delete('/images/:id')
  @UseGuards(TokenAuthGuard)
  deleteImg(@Param('id') id: string) {
    return this.carsService.removeImg(id);
  }
}
