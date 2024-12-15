import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmacoDto } from './dto/create-farmaco.dto';
import { UpdateFarmacoDto } from './dto/update-farmaco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmaco } from './entities/farmaco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmacosService {
  constructor(
    @InjectRepository(Farmaco)
    private readonly farmacoRepository: Repository<Farmaco>
  ){}

  async create(createFarmacoDto: CreateFarmacoDto) {
    const farmaco = await this.farmacoRepository.create(createFarmacoDto);
    const existingFarmaco = await this.farmacoRepository.findOneBy({ codigo: farmaco.codigo });
    if (existingFarmaco) 
      throw new BadRequestException(`Ya existe un farmaco registrado con el codigo: ${farmaco.codigo}.`);
    else
      return await this.farmacoRepository.save(farmaco);
  }

  async findAll() {
    return await this.farmacoRepository.find();
  }

  async findOne(codigo: string) {
    return await this.farmacoRepository.findOneBy({ codigo });
  }

  async update(codigo: string, updateFarmacoDto: UpdateFarmacoDto) {
    return await this.farmacoRepository.update(codigo, updateFarmacoDto);
  }

  async remove(codigo: string) {
    const farmacoD = await this.farmacoRepository.findOneBy({ codigo });
    if(farmacoD){
      return await this.farmacoRepository.remove(farmacoD);
    }
  }
}
