import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    await this.repository.save(user);

    return await this.findOne(user.id);
  }

  async findAll(): Promise<User[]> {
    const list = await this.repository.find();

    return list;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.repository.update({ id }, updateUserDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
