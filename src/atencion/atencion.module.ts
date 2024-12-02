import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtencionService } from './atencion.service';
import { AtencionController } from './atencion.controller';
import { Atencion } from './entities/atencion.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { DoctoresModule } from '../doctores/doctores.module';

@Module({
  imports: [TypeOrmModule.forFeature([Atencion, Paciente]),DoctoresModule],
  controllers: [AtencionController],
  providers: [AtencionService],
  exports: [AtencionService],
})
export class AtencionModule {}

