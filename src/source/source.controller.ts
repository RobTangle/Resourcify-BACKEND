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
  Query,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Auth0Guard } from 'src/auth0/auth0.guard';
import { GetAuthInfo } from 'src/auth/decorator';
import { ReqAuthDto } from 'src/user/dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserParsedSwagger } from 'src/user/dto/user-parsed-swagger.dto';

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
  @ApiForbiddenResponse({
    description:
      'Possible response if the User is not registered in the data base.',
  })
  create(
    @GetAuthInfo() reqAuth: ReqAuthDto,
    @Body() createSourceDto: CreateSourceDto,
  ) {
    return this.sourceService.create(createSourceDto, reqAuth);
  }

  @Get('/link/')
  @ApiOperation({
    summary: 'Parses the url to get the title of the web page',
  })
  parseLink(@Query('link') url: string, @GetAuthInfo() reqAuth: ReqAuthDto) {
    console.log('url en controller = ', url);
    return this.sourceService.parseLink(url, reqAuth);
  }

  // @Get()
  // findAll() {
  //   return this.sourceService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Possible response if the document is not found.',
  })
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
  @ApiNotFoundResponse({
    description: 'Possible response if the document is not found.',
  })
  @ApiForbiddenResponse({
    description:
      'Possible response if the User is not registered in the data base.',
  })
  update(
    @GetAuthInfo() reqAuth: ReqAuthDto,
    @Param('id') source_id: string,
    @Body() updateSourceDto: UpdateSourceDto,
  ) {
    return this.sourceService.update(reqAuth, source_id, updateSourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete Source',
    description:
      'Deletes a Source Document from the Source Collection and the User.resources array. It returns the Complete and Grouped User Object.',
  })
  @ApiOkResponse({
    type: UserParsedSwagger,
    description: 'The user document + de groupedDocs object.',
  })
  @ApiNotFoundResponse({
    description: 'Possible response if the document is not found.',
  })
  @ApiForbiddenResponse({
    description:
      'Possible response if the User is not registered in the data base.',
  })
  remove(@Param('id') id: string, @GetAuthInfo() reqAuth: ReqAuthDto) {
    return this.sourceService.remove(id, reqAuth);
  }
}
