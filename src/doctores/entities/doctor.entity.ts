import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Atencion } from '../../atencion/entities/atencion.entity';

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
}
