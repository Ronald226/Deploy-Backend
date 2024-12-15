import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDoctoreDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsNumber()
  especialidadId: number;
}
