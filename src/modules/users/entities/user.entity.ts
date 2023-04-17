import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Car } from 'src/modules/cars/entities/car.entity';
import { Address } from './address.entity';
import { Comment } from 'src/modules/cars/entities/comment.entity';
import { Exclude } from 'class-transformer';
//Fazer um yarn add class-transformer

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ default: true })
  is_announcer: boolean;

  @Column()
  description: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  birth: string;

  @OneToMany(() => Car, (car) => car.user, {
    cascade: true,
  })
  cars: Car[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];
}
