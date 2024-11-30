import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity()
export class Atencion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.atenciones, { eager: true })
  paciente: Paciente;

  @Column()
  fecha: Date;

  @Column()
  especialidad: string;

  @Column()
  doctor: string;
}