import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateFarmacoDto {
    @IsString()
    @MinLength(1)
    codigo : string;
        
    @IsString()
    @MinLength(1)
    nombre_articulo : string;
        
    @IsString()
    @MinLength(1)
    descripcion : string;
        
    @IsNumber()
    @IsPositive()
    stock: number;
        
    @IsNumber()
    @IsPositive()
    precio: number;   
}
