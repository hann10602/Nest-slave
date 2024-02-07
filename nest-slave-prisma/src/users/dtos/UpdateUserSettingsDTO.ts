import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSettingsDTO {
  @IsBoolean()
  @IsOptional()
  notifications: boolean;

  @IsBoolean()
  @IsOptional()
  smsEnabled: boolean;
}
