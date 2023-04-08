import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isTest: boolean;
}
