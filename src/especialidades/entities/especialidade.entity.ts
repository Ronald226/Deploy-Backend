import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Doctor } from '../../doctores/entities/doctor.entity';
@Entity('especialidades')
export class Especialidad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    nombre: string;
  
    // Relación con la entidad Doctor
    @OneToMany(() => Doctor, (doctor) => doctor.especialidad)
    doctores: Doctor[];
  }