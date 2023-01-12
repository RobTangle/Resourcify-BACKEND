import { IsEmail, IsOptional, IsString, isURL } from 'class-validator';

export class UserDetailsDto {
  @IsEmail()
  email: string;

  @IsString()
  sub: string;

  @IsOptional()
  @IsString()
  name: string;

  // @isURL()
  @IsOptional()
  @IsString()
  picture: string;
}
