import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SourceDocument = HydratedDocument<Source>;

@Schema({ timestamps: true })
export class Source {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, lowercase: true })
  category: string;

  @Prop({ required: false, lowercase: true })
  keywords: string[];

  @Prop({ required: false })
  order: number;

  @Prop({ required: true })
  user_sub: string;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
