import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly is_announcer: boolean;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly cpf: string;

  @IsNotEmpty()
  readonly birth: string;
}
export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
