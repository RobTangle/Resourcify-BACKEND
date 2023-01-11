import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceModule } from './source/source.module';

require('dotenv').config();
const MONGO_URL = process.env.MONGO_DB_URL;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    MongooseModule.forRoot(MONGO_URL),
    SourceModule,
  ],
})
export class AppModule {}
