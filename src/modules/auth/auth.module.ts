import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './token.strategy';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [PassportModule, CarsModule],
  controllers: [AuthController],
  providers: [AuthService, TokenStrategy],
})
export class AuthModule {}
