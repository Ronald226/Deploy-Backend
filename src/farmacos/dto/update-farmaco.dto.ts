import { PartialType } from '@nestjs/swagger';
import { CreateFarmacoDto } from './create-farmaco.dto';

export class UpdateFarmacoDto extends PartialType(CreateFarmacoDto) {}
