import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  async create(@Body() createEspecialidadeDto: CreateEspecialidadeDto) {
    return await this.especialidadesService.create(createEspecialidadeDto);
  }

  @Get()
  async findAll() {
    return await this.especialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadeDto: UpdateEspecialidadeDto) {
    return this.especialidadesService.update(+id, updateEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadesService.remove(+id);
  }
}
