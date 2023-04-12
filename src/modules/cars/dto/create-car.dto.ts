/*
import { Image } from '../entities/image.entity';
import { User } from '../entities/user.entity'; */

export class CreateCarDto {
  brand: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  fipe_table: number;
  color: string;
  price: number;
  description: string;
  /*
  images: Image[];
  user: User;
  comments: Comment[]; */
}
