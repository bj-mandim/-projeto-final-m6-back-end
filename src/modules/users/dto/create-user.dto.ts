import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsInt()
  number: number;

  @IsString()
  complement: string;

  @IsNotEmpty()
  @IsString()
  cep: string;
}

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

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
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
