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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { CarsService } from './cars.service';
import { CreateCarDto, ImageListDto, CommentDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AnnouncerGuard } from '../auth/announcer.guard';
import { CarOwnerGuard } from '../auth/car-owner.guard';
import { ImageOwnerGuard } from '../auth/image-owner.guard';
import { Car } from './entities/car.entity';
import { Image } from './entities/image.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

interface iTokenRequest extends Request {
  user: { userId: string; isAnnouncer: boolean };
}

@ApiTags('Cars')
@Controller('cars')
@UseInterceptors(ClassSerializerInterceptor)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Car })
  @UseGuards(TokenAuthGuard, AnnouncerGuard)
  create(@Body() createCarDto: CreateCarDto, @Request() req: iTokenRequest) {
    const userId = req.user.userId;
    return this.carsService.create(createCarDto, userId);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Car] })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Car })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Car })
  @UseGuards(TokenAuthGuard, CarOwnerGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @UseGuards(TokenAuthGuard, CarOwnerGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Post(':id/images')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: [Image] })
  @UseGuards(TokenAuthGuard, CarOwnerGuard)
  createImg(@Body() imageListDto: ImageListDto, @Param('id') id: string) {
    return this.carsService.createImg(imageListDto.images, id);
  }

  @Delete('/images/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @UseGuards(TokenAuthGuard, ImageOwnerGuard)
  deleteImg(@Param('id') id: string) {
    return this.carsService.removeImg(id);
  }

  @Post(':id/comments')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Comment })
  @UseGuards(TokenAuthGuard)
  createComment(
    @Body() commentListDto: CommentDto,
    @Param('id') id: string,
    @Request() req: iTokenRequest,
  ) {
    return this.carsService.createComment(commentListDto, id, req.user.userId);
  }

  @Get(':id/comments')
  @ApiResponse({ status: 200, type: [Comment] })
  findCarComments(@Param('id') id: string) {
    return this.carsService.findCarComments(id);
  }

  @Delete('comments/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @UseGuards(TokenAuthGuard)
  removeComment(@Param('id') id: string) {
    return this.carsService.removeComment(id);
  }

  @Patch('comments/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(TokenAuthGuard)
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.carsService.updateComment(id, updateCommentDto);
  }

  @Get('comments/:id')
  @ApiResponse({ status: 200, type: Comment })
  findComment(@Param('id') id: string) {
    return this.carsService.findComment(id);
  }
}
