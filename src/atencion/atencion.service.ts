import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atencion } from './entities/atencion.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Doctor } from '../doctores/entities/doctor.entity';

@Injectable()
export class AtencionService {
  constructor(
    @InjectRepository(Atencion)
    private readonly atencionesRepository: Repository<Atencion>,
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    
  ) {}

  async create(createAtencionDto: CreateAtencionDto) {
    const paciente = await this.pacientesRepository.findOneBy({
      historia: createAtencionDto.historia,
    });
  
    if (!paciente) {
      throw new BadRequestException(
        'No se encontró un paciente con el número de historia proporcionado.',
      );
    }
  
    const doctor = await this.doctorRepository.findOneBy({
      id: createAtencionDto.doctorId,
    });
  
    if (!doctor) {
      throw new BadRequestException(
        'No se encontró un doctor con el ID proporcionado.',
      );
    }
  
    const atencion = this.atencionesRepository.create({
      paciente,
      doctor,
      fecha: createAtencionDto.fecha,
      especialidad: createAtencionDto.especialidad,
    });
  
    return await this.atencionesRepository.save(atencion);
  }
  
  

  async findAll() {
    return await this.atencionesRepository.find();
  }

  async findOne(id: number) {
  
    const atencionF = await this.atencionesRepository.findOneBy({ id });
    if(!atencionF){
      throw new BadRequestException('nro atencion not found');
    }
    return atencionF;
  }

  update(id: number, updateAtencionDto: UpdateAtencionDto) {
    return `This action updates a #${id} atencion`;
  }

  remove(id: number) {
    return `This action removes a #${id} atencion`;
  }
}
