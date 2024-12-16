import { IsNotEmpty, IsNumber, IsString,IsBoolean, IsDate } from 'class-validator';
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
  @IsNumber()
  doctorId: number; // Ahora recibimos el ID del doctor

 

  @IsBoolean()
  estado?: boolean; 
}