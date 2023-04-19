import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './token.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    CarsModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, JwtService, TokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
