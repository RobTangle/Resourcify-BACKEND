import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';
import { GoogleStrategy } from './strategy/GoogleStrategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthGoogleController],
  providers: [
    GoogleStrategy,
    { provide: 'AUTH_GOOGLE_SERVICE', useClass: AuthGoogleService },
  ],
  exports: [AuthGoogleService],
})
export class AuthGoogleModule {}
