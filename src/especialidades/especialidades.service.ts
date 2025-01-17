import { Injectable } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './entities/especialidade.entity';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createEspecialidadDto: CreateEspecialidadeDto): Promise<Especialidad> {
    const especialidad = this.especialidadRepository.create(createEspecialidadDto);
    return await this.especialidadRepository.save(especialidad);
  }

  async findAll() {
    return await this.especialidadRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} especialidade`;
  }

  async update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return await this.especialidadRepository.update(id,updateEspecialidadeDto);
  }

  async remove(id: number) {
    return  await this.especialidadRepository.delete({id});
  }

}
