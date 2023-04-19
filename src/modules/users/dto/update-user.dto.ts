import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly username: string;
  readonly email: string;
  readonly description: string;
  readonly phone: string;
  readonly cpf: string;
  readonly birth: string;
}
