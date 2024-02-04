import { IsString } from 'class-validator';

export class CredentialDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class TokenPayloadDTO {
  @IsString()
  username: string;

  @IsString()
  displayName: string;

  @IsString()
  role: string;
}
