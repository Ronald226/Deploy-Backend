import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateAtencionDto {
@IsNotEmpty()
  @IsNumber()
  historia: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  especialidad: string;

  @IsNotEmpty()
  @IsNumber()
  doctorId: number; // Ahora recibimos el ID del doctor
}