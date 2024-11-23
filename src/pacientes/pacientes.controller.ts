import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {  
    return this.pacientesService.findOneDni(id);
  }

  @Get()
  findOneNyA( @Query('nombres') nombres: string, @Query('apellidos') apellidos: string) {  
    return this.pacientesService.findOneNyA(nombres, apellidos);
  }

  @Patch(':dni')
  update(@Param('dni') dni: number, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.update(dni, updatePacienteDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: number) {
    return this.pacientesService.remove(dni);
  }
}
