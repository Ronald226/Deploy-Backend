import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateDoctoreDto } from './dto/create-doctore.dto';
import { UpdateDoctoreDto } from './dto/update-doctore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctoreDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDoctorDto);
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

  update(id: number, updateDoctoreDto: UpdateDoctoreDto) {
    return `This action updates a #${id} doctore`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctore`;
  }
}
