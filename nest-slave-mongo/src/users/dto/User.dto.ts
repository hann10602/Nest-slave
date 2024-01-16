<<<<<<< HEAD
=======
import { Type } from 'class-transformer';
>>>>>>> f93459fa7fb529a1e84d3a4e5d037daf538cb42d
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
<<<<<<< HEAD

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
=======
>>>>>>> f93459fa7fb529a1e84d3a4e5d037daf538cb42d

export class CreateUserSettingsDTO {
  @IsOptional()
  @IsBoolean()
  receiveNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}
<<<<<<< HEAD
=======

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDTO)
  settings?: CreateUserSettingsDTO;
}

>>>>>>> f93459fa7fb529a1e84d3a4e5d037daf538cb42d
export class CreateUserDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
<<<<<<< HEAD
=======
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
>>>>>>> f93459fa7fb529a1e84d3a4e5d037daf538cb42d
  @IsString()
  displayName?: string;

  @IsOptional()
  @ValidateNested()
<<<<<<< HEAD
=======
  @Type(() => CreateUserSettingsDTO)
>>>>>>> f93459fa7fb529a1e84d3a4e5d037daf538cb42d
  settings?: CreateUserSettingsDTO;
}
