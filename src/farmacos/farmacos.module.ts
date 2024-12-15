import { Module } from '@nestjs/common';
import { FarmacosService } from './farmacos.service';
import { FarmacosController } from './farmacos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmaco } from './entities/farmaco.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Farmaco])],
  controllers: [FarmacosController],
  providers: [FarmacosService]
})
export class FarmacosModule {}
