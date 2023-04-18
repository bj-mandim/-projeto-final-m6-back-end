import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenAuthGuard } from './token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  auth() {
    return 'Rota ok';
  }
}
