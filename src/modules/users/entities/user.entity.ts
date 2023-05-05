import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Car } from 'src/modules/cars/entities/car.entity';
import { Address } from './address.entity';
import { Comment } from 'src/modules/cars/entities/comment.entity';
import { Exclude } from 'class-transformer';
//Fazer um yarn add class-transformer

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 120 })
  name: string;

  @ApiProperty()
  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({ default: true })
  is_announcer: boolean;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ length: 15 })
  phone: string;

  @ApiProperty()
  @Column({ length: 11 })
  cpf: string;

  @ApiProperty()
  @Column()
  birth: string;

  @Column({ nullable: true })
  reset_token: string;

  @ApiProperty({ type: () => Address })
  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: () => [Car] })
  @OneToMany(() => Car, (car) => car.user, {
    cascade: true,
  })
  cars: Car[];

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];
}
