import { Controller, Get, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { GetAuthInfo, GetUser } from '../auth/decorator';
// import { JwtGuard } from '../auth/guard';
import { Auth0Guard } from '../auth0/auth0.guard';
import { EditUserProfileDto } from './dto';
import { ReqAuthDto } from './dto/req-auth.dto';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
@UseGuards(Auth0Guard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('me')
  // getMe(@GetUser() user: User, @GetUser('email') email: string) {
  //   console.log({ email });
  //   return user;
  // }

  @Get('userinfo')
  async getOrAndCreateUser(@GetAuthInfo() reqAuth: ReqAuthDto) {
    const response = await this.userService.getUserWithGroupedDocs(reqAuth);
    return response;
  }

  @Get('exists')
  async userExists(@GetAuthInfo() reqAuth) {
    const userExists = await this.userService.userExists(
      reqAuth.sub,
      reqAuth.email,
    );
    return userExists;
  }

  //   @Patch('profile')
  //   editUserProfile(
  //     @GetUser('id') userId: string,
  //     @Body() dto: EditUserProfileDto,
  //   ) {
  //     return 'edited user';
  //     // return this.userService.editUser(userId, dto);
  //   }
}
