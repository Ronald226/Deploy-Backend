import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany,ManyToOne } from 'typeorm';
import { Atencion } from '../../atencion/entities/atencion.entity';
import { Especialidad } from '../../especialidades/entities/especialidade.entity';


@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @OneToMany(() => Atencion, (atencion) => atencion.doctor)
  atenciones: Atencion[];
  @ManyToOne(() => Especialidad, (especialidad) => especialidad.doctores, { eager: true })
  especialidad: Especialidad;
}
