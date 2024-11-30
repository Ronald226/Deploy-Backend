import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AtencionService } from './atencion.service';
import { CreateAtencionDto } from './dto/create-atencion.dto';
import { UpdateAtencionDto } from './dto/update-atencion.dto';

@ApiTags('Atenciones')
@Controller('atencion')
export class AtencionController {
  constructor(private readonly atencionService: AtencionService) {}

  @Post()
  @ApiBody({ type: CreateAtencionDto })
  create(@Body() createAtencionDto: CreateAtencionDto) {
    return this.atencionService.create(createAtencionDto);
  }

  @Get()
  findAll() {
    return this.atencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atencionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtencionDto: UpdateAtencionDto) {
    return this.atencionService.update(+id, updateAtencionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atencionService.remove(+id);
  }
}
