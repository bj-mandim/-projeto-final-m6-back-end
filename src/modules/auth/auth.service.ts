import { LoginUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (user?.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      sub: user.id,
      is_announcer: user.is_announcer,
    };
    const options: JwtSignOptions = { secret: process.env.SECRET_KEY };
    return {
      access_token: this.jwtService.sign(payload, options),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
