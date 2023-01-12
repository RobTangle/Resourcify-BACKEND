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
import { Request } from '@nestjs/common/decorators';
import { UserService } from 'src/user/user.service';
import { GetAuthInfo } from 'src/auth/decorator';
import { ReqAuthDto } from 'src/user/dto';

@UseGuards(Auth0Guard)
@Controller('source')
export class SourceController {
  constructor(
    private readonly sourceService: SourceService,
    private userService: UserService,
  ) {}

  // @Post()
  // create(
  //   @GetAuthInfo() reqAuth: ReqAuthDto,
  //   @Body() createSourceDto: CreateSourceDto,
  // ) {
  //   return this.sourceService.create(createSourceDto);
  // }

  @Post()
  create(
    @GetAuthInfo() reqAuth: ReqAuthDto,
    @Body() createSourceDto: CreateSourceDto,
  ) {
    return this.sourceService.create(createSourceDto, reqAuth);
  }

  @Get()
  findAll() {
    return this.sourceService.findAll();
  }

  @Get(':id')
  findOneById(@GetAuthInfo() reqAuth: ReqAuthDto, @Param('id') id: string) {
    console.log('REQ.AUTH!!!!! = ', reqAuth);
    // const reqAuth = req.auth;
    return this.sourceService.findOneById(id, reqAuth);
  }

  @Patch(':id')
  update(
    @GetAuthInfo() reqAuth: ReqAuthDto,
    @Param('id') source_id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ) {
    return this.sourceService.update(source_id, updateSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceService.remove(+id);
  }
}
