import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly link: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @IsOptional()
  @ApiProperty()
  readonly category: string;

  @IsString()
  @IsOptional()
  @Length(0, 300)
  @ApiPropertyOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  @Transform((val: any) => {
    console.log('TRANSFORM VAL = ', val.value);
    if (val) {
      const parsedVal = +val.value;
      if (Number.isNaN(parsedVal)) {
        throw new Error('Order/Relevance must be a positive number');
      }
      return parsedVal;
    } else {
      return undefined;
    }
  })
  @ApiPropertyOptional()
  readonly order: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  readonly is_favourite: boolean;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  readonly keywords?: string[];
}
