import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';
import { Doctor } from '../../doctores/entities/doctor.entity';


@Entity()
export class Atencion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.atenciones, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Doctor, (doctor) => doctor.atenciones,{ eager: true })
  doctor: Doctor;

  @Column()
  fecha: Date;

  @Column()
  especialidad: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;


  
}