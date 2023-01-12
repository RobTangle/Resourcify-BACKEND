import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google.guard';

@Controller('api/auth')
export class AuthGoogleController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK. Redirect' };
  }
}
