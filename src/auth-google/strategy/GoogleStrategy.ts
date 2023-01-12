import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthGoogleService } from '../auth-google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_GOOGLE_SERVICE')
    private readonly authService: AuthGoogleService,
  ) {
    super({
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3333/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('access Token = ', accessToken);
    console.log('refresh token = ', refreshToken);
    console.log('profile = ', profile);
  }
}
