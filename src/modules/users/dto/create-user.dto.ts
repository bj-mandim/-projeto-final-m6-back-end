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
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty()
  @IsString()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cep: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_announcer: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(15)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  birth: string;

  @ApiProperty({ type: AddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  password: string;
}
