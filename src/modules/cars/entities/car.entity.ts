import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Comment } from './comment.entity';
import { Image } from './image.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('cars')
export class Car {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  brand: string;

  @ApiProperty()
  @Column()
  model: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  fuel: string;

  @ApiProperty()
  @Column()
  km: number;

  @ApiProperty()
  @Column('float')
  fipe_table: number;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column('float')
  price: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ type: () => [Image] })
  @OneToMany(() => Image, (image) => image.car, {
    eager: true,
  })
  images: Image[];

  @ApiProperty({ type: User })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (Comment) => Comment.car, {
    onDelete: 'SET NULL',
  })
  comments: Comment[];
}
