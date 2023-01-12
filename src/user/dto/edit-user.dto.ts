import { IsOptional, IsString, IsUrl } from 'class-validator';

export class EditUserProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  profile_img?: string;
}
