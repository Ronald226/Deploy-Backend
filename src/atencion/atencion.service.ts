import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atencion } from './entities/atencion.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Doctor } from '../doctores/entities/doctor.entity';
import { Especialidad } from '../especialidades/entities/especialidade.entity';

@Injectable()
export class AtencionService {
  constructor(
    @InjectRepository(Atencion)
    private readonly atencionesRepository: Repository<Atencion>,
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
    
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

    const especialidad = await this.especialidadRepository.findOneBy({
      id: createAtencionDto.especialidadId,
    });

    const atencion = this.atencionesRepository.create({
      paciente,
      doctor,
      especialidad: especialidad.nombre, 
      fecha: createAtencionDto.fecha,
      estado: createAtencionDto.estado
    });
    return await this.atencionesRepository.save(atencion);
  }

  async findByHistoria(historia: number) {
    const paciente = await this.pacientesRepository.findOneBy({ historia });
  
    if (!paciente) {
      throw new BadRequestException(
        'No se encontró un paciente con el número de historia proporcionado.',
      );
    }
  
    // Busca todas las atenciones asociadas al paciente
    const atenciones = await this.atencionesRepository.find({
      where: { paciente: { dni: paciente.dni } },
      relations: ['doctor'], // Incluye relaciones si es necesario
    });
  
    return atenciones;
  }
  
  
  async findAll(): Promise<Atencion[]> {
    return await this.atencionesRepository.find({
    relations: ['paciente', 'doctor'],
   });
  }


  async findOne(id: number) {
  
    const atencion = await this.atencionesRepository.findOne({
      where: { id },
      relations: ['paciente', 'doctor'], // Relaciona entidades necesarias
    });

    if (!atencion) {
      throw new NotFoundException(`Atención con ID ${id} no encontrada.`);
    }

    return atencion;
  }

  async update(id: number, updateAtencionDto: UpdateAtencionDto): Promise<Atencion> {
  // Buscar la atención existente por ID
    const atencion = await this.findOne(id);

    // Validar y actualizar el paciente si se proporciona un número de historia
    if (updateAtencionDto.historia) {
      const paciente = await this.pacientesRepository.findOneBy({
        historia: updateAtencionDto.historia,
      });

      if (!paciente) {
        throw new BadRequestException(
          'No se encontró un paciente con el número de historia proporcionado.',
        );
      }
      atencion.paciente = paciente;
    }

    if (updateAtencionDto.doctorId) {
      const doctor = await this.doctorRepository.findOneBy({ id: updateAtencionDto.doctorId });
      if (!doctor) {
        throw new BadRequestException('No se encontró un doctor con el ID proporcionado.');
      }
      atencion.doctor = doctor;
    }

    if (updateAtencionDto.especialidadId) {
      const especialidad = await this.especialidadRepository.findOneBy({
        id: updateAtencionDto.especialidadId,
      });

      if (!especialidad) {
        throw new BadRequestException(
          'No se encontró una especialidad con el ID proporcionado.',
        );
      }

      atencion.especialidad = especialidad.nombre;
    }

    if (updateAtencionDto.fecha) {
      atencion.fecha = updateAtencionDto.fecha;
    }
    if (typeof updateAtencionDto.estado === 'boolean') {
      atencion.estado = updateAtencionDto.estado;
    }
    return await this.atencionesRepository.save(atencion);
  }
  async remove(id: number) {
    return await this.atencionesRepository.delete({id});
  }
}
