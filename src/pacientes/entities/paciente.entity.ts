import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany } from "typeorm";
import { Atencion } from '../../atencion/entities/atencion.entity';

@Entity()
export class Paciente {

    @Column({ primary: true, unique: true, nullable: false })
    dni: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    apellidos: string;

    @Column({ unique: true, nullable: false })
    historia: number;

    @CreateDateColumn() 
    fechaCreacion: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Atencion, (atencion) => atencion.paciente)
    atenciones: Atencion[];
}
