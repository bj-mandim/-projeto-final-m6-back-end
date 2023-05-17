import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddressDto, CreateUserDto } from './create-user.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAddressDto extends PartialType(AddressDto) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: UpdateAddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: AddressDto;
}
