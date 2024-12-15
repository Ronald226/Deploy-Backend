import { Column, Entity } from "typeorm";

@Entity()
export class Farmaco {
    @Column({ primary : true })    
    codigo : string;
    
    @Column()
    nombre_articulo : string;
    
    @Column()
    descripcion : string;
    
    @Column()
    stock: number;
    
    @Column()
    precio: number;    
}
