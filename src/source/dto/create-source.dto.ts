import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  Length,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateSourceDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 65)
  title: string;

  @IsString()
  @IsOptional()
  @Length(1, 300)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsBoolean()
  @IsOptional()
  is_favourite: boolean;

  @IsArray()
  @IsOptional()
  keywords?: string[];
}
