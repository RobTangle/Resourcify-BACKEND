import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Auth0Guard } from 'src/auth0/auth0.guard';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourceService.create(createSourceDto);
  }

  @Get()
  findAll() {
    return this.sourceService.findAll();
  }

  @UseGuards(Auth0Guard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourceService.update(id, updateSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceService.remove(+id);
  }
}
