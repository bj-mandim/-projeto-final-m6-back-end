import {
  IsString,
  MaxLength,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsDecimal,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fuel: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  km: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,3', force_decimal: true })
  fipe_table: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,3', force_decimal: true })
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ type: [ImageDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}

export class ImageListDto {
  @ApiProperty({ type: [ImageDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}
