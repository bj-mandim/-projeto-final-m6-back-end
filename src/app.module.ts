import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './database/postgres/config.service';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: './db.sql',
      type: 'sqlite',
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
    }),
    CarsModule,
  ],
})
export class AppModule {}
