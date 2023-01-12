import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  sub: string;

  @Prop({ required: false })
  email: string;

  @Prop()
  resources: [Source];
}

export const UserSchema = SchemaFactory.createForClass(User);
