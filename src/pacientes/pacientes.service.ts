import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
  ) { }
  
  
  async create(createPacienteDto: CreatePacienteDto) {
    const paciente = this.pacientesRepository.create(createPacienteDto);
    return await this.pacientesRepository.save(paciente);
  }

  async findAll() {
    return await this.pacientesRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  async remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
