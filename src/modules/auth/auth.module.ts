import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './token.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, TokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
