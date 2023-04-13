import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsDecimal,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
// import { Image } from '../entities/image.entity';
// import { User } from '../entities/user.entity';

// export class CreateCarDto {
//   brand: string;
//   model: string;
//   year: number;
//   fuel: string;
//   km: number;
//   fipe_table: number;
//   color: string;
//   price: number;
//   description: string;
//   images: Image[];
//   user: User;
//   comments: Comment[];
// }

export class CreateCarDto {
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

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}

export class ImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
