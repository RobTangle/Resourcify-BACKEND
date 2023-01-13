import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SourceDocument = HydratedDocument<Source>;

@Schema({ timestamps: true })
export class Source {
  @IsString()
  @Prop({ required: true })
  title: string;

  @IsString()
  @Prop({ required: false })
  description: string;

  @IsUrl()
  @Prop({ required: true })
  link: string;

  @IsString()
  @Prop({ required: true, lowercase: true })
  category: string;

  @IsString({ each: true })
  @Prop({ required: false, lowercase: true })
  keywords: string[];

  @IsNumber()
  @Prop({ required: false })
  order: number;

  @Prop({ required: false })
  is_favourite: boolean;

  @IsString()
  @Prop({ required: true, immutable: true })
  user_sub: string;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
