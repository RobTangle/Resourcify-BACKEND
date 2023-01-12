import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDetailsDto } from 'src/user/dto/user-details.dto';
import { AuthGoogleService } from '../auth-google.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_GOOGLE_SERVICE')
    private readonly authService: AuthGoogleService,
  ) {
    super();
  }

  serializeUser(user: UserDetailsDto, done: Function) {
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    // this.authService.findUser();
  }
}
