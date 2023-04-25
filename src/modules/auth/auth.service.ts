import { LoginUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    const isPasswordValid = await this.usersService.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    console.log(loginUserDto.password);
    console.log(user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
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
}
