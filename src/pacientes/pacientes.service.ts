import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { Repository,ILike  } from 'typeorm';

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
        { historia: createPacienteDto.historia }, // Validar por Historia Clínica
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

   // metodo para buscar por historia clinica
   async findOneByHistoria(historia: number) {
    const paciente = await this.pacientesRepository.findOneBy({ historia });
    if (!paciente) {
      throw new BadRequestException('Paciente no encontrado con el numero de historia proporcionado.');
    }
    return paciente;
  }

  async findOneDni(dni: number) {
    const pacienteF = await this.pacientesRepository.findOneBy({ dni });
    if(!pacienteF){
      throw new BadRequestException('Paciente not found');
    }
    return pacienteF;
  }

  

  async update(dni: number, updatePacienteDto: UpdatePacienteDto) {
    return await this.pacientesRepository.update(dni, updatePacienteDto);
  }

 
  // Método de busqueda por nombres y/o apellidos
  async searchByNameAndLastName(nombres?: string, apellidos?: string) {
   
    if (!nombres && !apellidos) {
      throw new BadRequestException(
        'Debe proporcionar al menos el nombre o el apellido para realizar la búsqueda',
      );
    }

    // Construir las condiciones dinámicamente
    const whereCondition: any = {};
    if (nombres) {
      whereCondition.nombres = ILike(`%${nombres}%`);
    }
    if (apellidos) {
      whereCondition.apellidos = ILike(`%${apellidos}%`);
    }

    // Buscar pacientes 
    const pacientes = await this.pacientesRepository.find({
      where: whereCondition,
    });
    if (pacientes.length === 0) {
      throw new BadRequestException('No se encontraron pacientes con los criterios especificados');
    }

    return pacientes;
  }




  async remove(dni: number) {
    return await this.pacientesRepository.delete({dni});
  }
}
