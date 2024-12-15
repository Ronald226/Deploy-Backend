import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmacosService } from './farmacos.service';
import { CreateFarmacoDto } from './dto/create-farmaco.dto';
import { UpdateFarmacoDto } from './dto/update-farmaco.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('farmacos')
@Controller('farmacos')
export class FarmacosController {
  constructor(private readonly farmacosService: FarmacosService) {}

  @Post()
  create(@Body() createFarmacoDto: CreateFarmacoDto) {
    return this.farmacosService.create(createFarmacoDto);
  }

  @Get()
  findAll() {
    return this.farmacosService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.farmacosService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateFarmacoDto: UpdateFarmacoDto) {
    return this.farmacosService.update(codigo, updateFarmacoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.farmacosService.remove(codigo);
  }
}