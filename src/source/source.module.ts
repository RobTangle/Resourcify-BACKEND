import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Source, SourceSchema } from './schema/source.schema';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Source.name, schema: SourceSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SourceController],
  providers: [SourceService, UserService],
})
export class SourceModule {}
