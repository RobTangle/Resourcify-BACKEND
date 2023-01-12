import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceModule } from './source/source.module';
import { Auth0Module } from './auth0/auth0.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { GoogleStrategy } from './auth-google/strategy/GoogleStrategy';
import { PassportModule } from '@nestjs/passport';

require('dotenv').config();
const MONGO_URL = process.env.MONGO_DB_URL;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    UserModule,
    // BookmarkModule,
    // PrismaModule,
    MongooseModule.forRoot(MONGO_URL),
    SourceModule,
    Auth0Module,
    // AuthGoogleModule,
    // PassportModule.register({ session: true }),
  ],
  // providers: [GoogleStrategy],
})
export class AppModule {}
