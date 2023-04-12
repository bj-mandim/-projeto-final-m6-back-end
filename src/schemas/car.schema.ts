import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsDecimal,
} from 'class-validator';

export class CarSchema {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  fuel: string;

  @IsNotEmpty()
  @IsInt()
  km: number;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,3', force_decimal: true })
  fipe_table: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,3', force_decimal: true })
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsBoolean()
  is_active: boolean;
}
