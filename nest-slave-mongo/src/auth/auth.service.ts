/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { CredentialDTO, TokenPayloadDTO } from './dto/Auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(credential: CredentialDTO): Promise<{ access_token: string }> {
    const loginUser = await this.userService.findOneByUsername(
      credential.username,
    );

    if (!loginUser) throw new UnauthorizedException();

    const isPasswordMatched = await bcrypt.compare(
      credential.password,
      loginUser.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload: TokenPayloadDTO = {
      username: loginUser?.username,
      displayName: loginUser?.displayName,
      role: loginUser?.role?.code,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
