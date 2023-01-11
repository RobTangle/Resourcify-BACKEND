import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateSourceDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  title: string;

  @IsString()
  @IsOptional()
  @Length(1, 200)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 300)
  link: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsArray()
  @IsOptional()
  keywords?: string[];
}
