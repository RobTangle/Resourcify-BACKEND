import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetAuthInfo } from '../auth/decorator';
// import { JwtGuard } from '../auth/guard';
import { Auth0Guard } from '../auth0/auth0.guard';
import { ReqAuthDto } from './dto/req-auth.dto';
import { UserParsedSwagger } from './dto/user-parsed.dto';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
@UseGuards(Auth0Guard)
@Controller('users')
@ApiBearerAuth('JWT-auth')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('me')
  // getMe(@GetUser() user: User, @GetUser('email') email: string) {
  //   console.log({ email });
  //   return user;
  // }

  @Get('userinfo')
  @ApiOperation({
    summary:
      'A SignIn or/and SignUp automatic operation that returns the user doc.',
    description:
      "Responds with the {...User_document + groupedDocs} that contains the user's Source docs ordered in array depending the 'category' key of each Source. If the user doesn't exists in the Data Base, it will automaticly create it and returns the newly created User document.",
  })
  @ApiOkResponse({
    type: UserParsedSwagger,
    description: 'The user document + de groupedDocs object.',
  })
  async getOrAndCreateUser(@GetAuthInfo() reqAuth: ReqAuthDto) {
    const response = await this.userService.getUserWithGroupedDocs(reqAuth);
    return response;
  }

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
}
