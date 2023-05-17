import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  CreateUserDto,
  ResetPassDto,
  ResetPassEmailDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { SelfGuard } from '../auth/self.guard';
import { Request } from 'express';
import { User } from './entities/user.entity';

interface iTokenRequest extends Request {
  user: { userId: string; isAnnouncer: boolean };
}

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/profile')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: User })
  @UseGuards(TokenAuthGuard)
  findProfile(@Req() req: iTokenRequest) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: User })
  @UseGuards(TokenAuthGuard, SelfGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @UseGuards(TokenAuthGuard, SelfGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'Link para redefinição de senha enviado para o email',
      },
    },
  })
  async sendEmailResetPassword(@Body() resetEmailDto: ResetPassEmailDto) {
    await this.usersService.sendResetEmailPassword(resetEmailDto);
    return { message: 'Link para redefinição de senha enviado para o email' };
  }

  @Patch('resetPassword/:token')
  @ApiResponse({
    status: 200,
    schema: {
      example: { message: 'Senha alterada com sucesso' },
    },
  })
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPassDto: ResetPassDto,
  ) {
    await this.usersService.resetPassword(resetPassDto, token);
    return { message: 'Senha alterada com sucesso' };
  }
}
