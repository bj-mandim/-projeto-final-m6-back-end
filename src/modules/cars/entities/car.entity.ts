import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comment } from './comment.entity';
import { Image } from './image.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  fuel: string;

  @Column()
  km: number;

  @Column('float')
  fipe_table: number;

  @Column()
  color: string;

  @Column('float')
  price: number;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Image, (image) => image.car, {
    eager: true,
  })
  images: Image[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Comment, (Comment) => Comment.car, {
    onDelete: 'SET NULL',
  })
  comments: Comment[];
}
