import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { TokenPayloadDTO } from './dto/Auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string): Promise<{ access_token: string }> {
    const loginUser = await this.userService.findOneByUsername(username);

    if (!loginUser) throw new UnauthorizedException();

    const payload: TokenPayloadDTO = {
      username: loginUser?.username,
      displayName: loginUser?.username,
      role: loginUser?.role?.code,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
