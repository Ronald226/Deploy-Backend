import { BadRequestException, Injectable } from '@nestjs/common';
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
    // Verificar si el DNI ya existe
    const pacienteExistente = await this.pacientesRepository.findOne({
      where: [
        { dni: createPacienteDto.dni }, // Validar por DNI
        { historia: createPacienteDto.historia }, // Validar por Número de Historia Clínica
      ],
    });

    if (pacienteExistente) {
      throw new BadRequestException(
        'El paciente ya existe con este DNI o Número de Historia Clínica',
      );
    }

    // Si no existe, crear el paciente
    const paciente = this.pacientesRepository.create(createPacienteDto);
    return await this.pacientesRepository.save(paciente);
  }


  async findAll() {
    return await this.pacientesRepository.find();
  }

  async findOneDni(dni: number) {
    const pacienteF = await this.pacientesRepository.findOneBy({ dni });
    if(!pacienteF){
      throw new BadRequestException('Paciente not found');
    }
    return pacienteF;
  }

  async findOneNyA(nombres: string, apellidos: string) {
    const pacienteF = await this.pacientesRepository.findOne({ 
      where:{
        nombres: nombres, 
        apellidos: apellidos
      } 
    });

    if(!pacienteF){
      throw new BadRequestException('Paciente not found');
    }
    return pacienteF;
  }

  async update(dni: number, updatePacienteDto: UpdatePacienteDto) {
    return await this.pacientesRepository.update(dni, updatePacienteDto);
  }

  async remove(dni: number) {
    return await this.pacientesRepository.softDelete({dni});
  }
}
