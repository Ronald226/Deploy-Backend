import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDoctoreDto } from './dto/create-doctore.dto';
import { UpdateDoctoreDto } from './dto/update-doctore.dto';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './doctores.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('doctores')
@Controller('doctores')
export class DoctoresController {
  constructor(private readonly doctoresService: DoctorService) {}

  @Post()
  @ApiBody({ type: CreateDoctoreDto })
  async create(@Body() createDoctorDto: CreateDoctoreDto) {
    return await this.doctoresService.create(createDoctorDto);
  }

 
  @Get()
  findAll() {
    return this.doctoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.doctoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctoreDto: UpdateDoctoreDto) {
    return this.doctoresService.update(+id, updateDoctoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctoresService.remove(+id);
  }
}
