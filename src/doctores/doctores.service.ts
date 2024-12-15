import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateDoctoreDto } from './dto/create-doctore.dto';
import { UpdateDoctoreDto } from './dto/update-doctore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { Especialidad } from 'src/especialidades/entities/especialidade.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createDoctorDto: CreateDoctoreDto): Promise<Doctor> {

    const especialidad = await this.especialidadRepository.findOneBy({
      id: createDoctorDto.especialidadId,
    });

    if (!especialidad) {
      throw new BadRequestException(
        'No se encontró una especialidad con el ID proporcionado.',
      );
    }
    
    
    // Crear el nuevo doctor con la especialidad asociada
    const doctor = this.doctorRepository.create({
      nombre: createDoctorDto.nombre,
      apellido: createDoctorDto.apellido,
      especialidad: especialidad, // Asociar la especialidad
    });
    
    return await this.doctorRepository.save(doctor);
  }
  
  async findAll() {
    return await this.doctorRepository.find();
  }

  async findOne(id: number) {
  
    const doctorF = await this.doctorRepository.findOneBy({ id });
    if(!doctorF){
      throw new BadRequestException('nro atencion not found');
    }
    return doctorF;
  }

  async update(id: number, updateDoctoreDto: UpdateDoctoreDto) {
    return await this.doctorRepository.update(id,updateDoctoreDto);
  }

  async remove(id: number) {
    return await  this.doctorRepository.delete({id});
  }
  
}
