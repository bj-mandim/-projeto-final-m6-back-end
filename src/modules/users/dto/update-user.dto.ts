import { PartialType } from '@nestjs/mapped-types';
import { AddressDto, CreateUserDto } from './create-user.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: AddressDto;
}

export class UpdateAddressDto extends PartialType(AddressDto) {}
