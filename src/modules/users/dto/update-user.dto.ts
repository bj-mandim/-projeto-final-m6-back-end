import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @ValidateNested()
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(11)
  @ValidateNested()
  @IsInt()
  cpf?: number;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(120)
  @IsInt()
  phone?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  description?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @ValidateNested()
  password?: string;

  @IsNotEmpty()
  @IsString()
  @IsInt()
  birth?: string;

  @IsBoolean()
  is_announcer?: boolean;
}
