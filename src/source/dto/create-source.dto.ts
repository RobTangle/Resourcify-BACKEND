import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { MaxLengthWithMessage } from '../decorators/';

export class CreateSourceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLengthWithMessage(70)
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly link: string;

  @IsString()
  @IsNotEmpty()
  @MaxLengthWithMessage(30)
  @IsOptional()
  @ApiProperty()
  readonly category: string;

  @IsString()
  @IsOptional()
  @MaxLengthWithMessage(900)
  @ApiPropertyOptional()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  @Transform((val: any) => {
    if (val) {
      const parsedVal = +val.value;
      if (Number.isNaN(parsedVal)) {
        throw new Error('Order/Relevance must be a positive number');
      }
      return parsedVal;
    } else {
      return 0;
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
