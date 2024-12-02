import { PartialType } from '@nestjs/swagger';
import { CreateDoctoreDto } from './create-doctore.dto';

export class UpdateDoctoreDto extends PartialType(CreateDoctoreDto) {}
