import { Controller, Get, Post, Body, Patch, Param, Delete, Query,BadRequestException } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { ApiQuery} from '@nestjs/swagger';
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

  //Metodo para buscar por nombres y apellidos
  @Get('search')
  @ApiQuery({ name: 'nombres', required: false, type: String })
  @ApiQuery({ name: 'apellidos', required: false, type: String })
  async search(
    @Query('nombres') nombres?: string,
    @Query('apellidos') apellidos?: string,
  ) {
    if (!nombres && !apellidos) {
      throw new BadRequestException(
        'Debe proporcionar al menos el nombre o el apellido para realizar la búsqueda',
      );
    }

    return this.pacientesService.searchByNameAndLastName(nombres, apellidos);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {  
    return this.pacientesService.findOneDni(id);
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
