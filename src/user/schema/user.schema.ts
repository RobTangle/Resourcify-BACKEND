import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Prop({ required: true, unique: true, immutable: true })
  sub: string;

  @IsEmail()
  @Prop({ required: false, unique: true, immutable: true })
  email: string;

  @Prop()
  resources: [Source];
}

export const UserSchema = SchemaFactory.createForClass(User);
