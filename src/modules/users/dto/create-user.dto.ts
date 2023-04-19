import {
  IsString,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  is_announcer: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(15)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  birth: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  password: string;
}
