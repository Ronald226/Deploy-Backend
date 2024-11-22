import { IsInt, IsPositive, IsString, Max, Min } from "class-validator";

export class CreatePacienteDto {

    @IsInt()
    @IsPositive()
    @Min(10000000)    
    @Max(99999999)
    dni: number;

    @IsString()
    nombres: string;

    @IsString()
    apellidos: string;

    @IsInt()
    historia: number;

}