import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class ReqAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  sub: string;

  @IsBoolean()
  email_verified: boolean;

  iss: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
