import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
// import { AuthGoogleService } from '../auth-google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '671791036522-v08fkc4do70cub2f2jp1796niq9vnvia.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3333/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log('access Token = ', accessToken);
    console.log('refresh token = ', refreshToken);
    console.log('profile = ', profile);
    done(null, profile);
  }
}
