import { Controller, Get, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetAuthInfo } from '../auth/decorator';
// import { JwtGuard } from '../auth/guard';
import { Auth0Guard } from '../auth0/auth0.guard';
import { NewUserDocSwagger } from './dto/new-user-doc.dto';
import { ReqAuthDto } from './dto/req-auth.dto';
import { UserParsedSwagger } from './dto/user-parsed-swagger.dto';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
@UseGuards(Auth0Guard)
@Controller('users')
@ApiBearerAuth('JWT-auth')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  // CREATE NEW USER :
  @Post('newUser')
  @ApiOperation({
    summary:
      'It creates a new User in the data base based on the JWT token sent in the request.',
  })
  @ApiResponse({
    type: NewUserDocSwagger,
    description: 'Responds with the new User Document.',
    status: 201,
  })
  async createNewUser(@GetAuthInfo() reqAuth: ReqAuthDto) {
    return this.userService.createUser(reqAuth);
  }

  // GET USER FROM THE DB :
  @Get('user')
  @ApiOperation({
    summary:
      'Find the User in the database and returns the user doc + groupedDocs object.',
  })
  @ApiNotFoundResponse({ description: 'User not found in the data base.' })
  @ApiOkResponse({
    type: UserParsedSwagger,
    description:
      'User found in the data base. Returning the userParsedSwaggerDto.',
  })
  async getUser(@GetAuthInfo() reqAuth: ReqAuthDto) {
    return this.userService.getUserParsed(reqAuth);
  }

  // USER EXISTS ? :
  // @ApiExcludeEndpoint()
  @Get('exists')
  @ApiOperation({
    summary:
      'Responds with msg: true/false depending if the user exists in the data base',
  })
  @ApiOkResponse({
    description:
      'Return an object like {msg: boolean} with the prop msg, with a boolean true or false as value.',
  })
  // @ApiBearerAuth('JWT-auth')
  async userExists(@GetAuthInfo() reqAuth) {
    const userExists = await this.userService.userExists(
      reqAuth.sub,
      reqAuth.email,
    );
    return userExists;
  }

  // @Get('userinfo')
  // @ApiOperation({
  //   summary:
  //     'A SignIn or/and SignUp automatic operation that returns the user doc.',
  //   description:
  //     "Responds with the {...User_document + groupedDocs} that contains the user's Source docs ordered in array depending the 'category' key of each Source. If the user doesn't exists in the Data Base, it will automaticly create it and returns the newly created User document.",
  // })
  // @ApiOkResponse({
  //   type: UserParsedSwagger,
  //   description: 'The user document + de groupedDocs object.',
  // })
  // async getOrAndCreateUser(@GetAuthInfo() reqAuth: ReqAuthDto) {
  //   const response = await this.userService.getUserWithGroupedDocs(reqAuth);
  //   return response;
  // }
}
