import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { SelfGuard } from '../auth/self.guard';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const newUser = await createUserService(data);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export const listUserController = async (req: Request, res: Response) => {
  try {
    const user = await listUserService();
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

  @Get(':id')
  @UseGuards(TokenAuthGuard, SelfGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, SelfGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
};

  @Delete(':id')
  @UseGuards(TokenAuthGuard, SelfGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
