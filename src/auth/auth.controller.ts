import { Controller, HttpStatus, Post } from '@nestjs/common';
import {
  Body,
  Get,
  HttpCode,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    // console.log('REQ.USER = ', req.user);
    // const jwt = await this.authService.login(req.user);
    // res.set('authorization', jwt.access_token);
    // return res.json(req.user);
  }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
