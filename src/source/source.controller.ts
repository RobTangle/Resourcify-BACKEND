import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Auth0Guard } from 'src/auth0/auth0.guard';
import { GetAuthInfo } from 'src/auth/decorator';
import { ReqAuthDto } from 'src/user/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserParsedSwagger } from 'src/user/dto/user-parsed.dto';

@UseGuards(Auth0Guard)
@Controller('source')
@ApiBearerAuth('JWT-auth')
@ApiTags('Source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  // @Post()
  // create(
  //   @GetAuthInfo() reqAuth: ReqAuthDto,
  //   @Body() createSourceDto: CreateSourceDto,
  // ) {
  //   return this.sourceService.create(createSourceDto);
  // }

  @Post()
  @ApiOperation({
    summary: 'Creates a new Source and return the updated User',
    description:
      'Creates a Source Document in the Source Collection and the User.resources array. It returns the Complete and Grouped User Object.',
  })
  @ApiOkResponse({
    type: UserParsedSwagger,
    description: 'The user document + de groupedDocs object.',
  })
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
    return this.sourceService.findOneById(id, reqAuth);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UserParsedSwagger,
    description: 'The user document + de groupedDocs object.',
  })
  @ApiOperation({
    summary: 'Update with update service from my own invention..',
    description:
      'Updates a Source Document from the Source Collection and the User.resources array. It returns the Complete and Grouped User Object.',
  })
  update(
    @GetAuthInfo() reqAuth: ReqAuthDto,
    @Param('id') source_id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ) {
    return this.sourceService.update(reqAuth, source_id, updateSourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete Source',
    description:
      'Deletes a Source Document from the Source Collection and the User.resources array. It returns the Complete and Grouped User Object.',
  })
  @ApiOkResponse({
    type: UserParsedSwagger,
    description: 'The user document + de groupedDocs object.',
  })
  remove(@Param('id') id: string, @GetAuthInfo() reqAuth: ReqAuthDto) {
    return this.sourceService.remove(id, reqAuth);
  }
}
