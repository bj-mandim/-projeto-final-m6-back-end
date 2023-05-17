import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Car } from './car.entity';

@Entity('images')
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  url: string;

  @ManyToOne(() => Car, { onDelete: 'CASCADE' })
  car: Car;
}
