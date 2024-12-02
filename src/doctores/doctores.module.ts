import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './doctores.service';
import { DoctoresController } from './doctores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctoresController],
  providers: [DoctorService],
  exports: [TypeOrmModule, DoctorService],
})
export class DoctoresModule {}
