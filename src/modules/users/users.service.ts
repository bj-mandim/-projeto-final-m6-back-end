import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { MailService } from 'src/utils/mail.service';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const address = this.addressRepository.create(createUserDto.address);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.addressRepository.save(address);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      address: address,
    });
    await this.usersRepository.save(user);

    return await this.findOne(user.id);
  }

  async findAll(): Promise<User[]> {
    const list = await this.usersRepository.find();

    return list;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id_user', { id_user: id })
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.cars', 'cars')
      .leftJoinAndSelect('cars.images', 'images')
      .getOne();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.address) {
      await this.addressRepository.update(
        { id: user.address.id },
        updateUserDto.address,
      );
      delete updateUserDto.address;
    }

    if (Object.keys(updateUserDto).length) {
      await this.usersRepository.update({ id }, updateUserDto);
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.usersRepository.delete({ id });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email_user', { email_user: email })
      .leftJoinAndSelect('user.address', 'address')
      .getOne();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async sendResetEmailPassword(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email_user', { email_user: email })
      .leftJoinAndSelect('user.address', 'address')
      .getOne();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const resetToken = randomUUID();

    await this.usersRepository.update({ email }, { reset_token: resetToken });

    const resetPasswordTemplate = await this.mailService.resetPassword(
      email,
      user.name,
      resetToken,
    );

    console.log(resetPasswordTemplate);

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(pass: string, resetToken: string) {
    const user = await this.usersRepository.findOne({
      where: {
        reset_token: resetToken,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.update(
      { id: user.id },
      { password: hashSync(pass, 10), reset_token: null },
    );
  }
}
