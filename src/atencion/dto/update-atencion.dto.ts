import { PartialType } from '@nestjs/swagger';
import { CreateAtencionDto } from './create-atencion.dto';

export class UpdateAtencionDto extends PartialType(CreateAtencionDto) {}
