import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/constants/jwt';
import { TokenPayloadDTO } from './dto/Auth.dto';

type RequestProps = {
  user: TokenPayloadDTO;
};

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      res.status(401).json({ message: 'Token is missing' });
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService
        .verifyAsync(token, {
          secret: jwtConstants.secret,
        })
        .catch(() => {
          res.status(401).json({ message: 'Token expired' });
          throw new UnauthorizedException();
        });

      req['user'] = payload;
    } catch {
      res.status(401).json({ message: 'Invalid token' });
      throw new UnauthorizedException();
    }

    return true;
  }
}

@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user }: RequestProps = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    if (!user) {
      res.redirect('/login');
      return false;
    }

    const userRole = user.role || undefined;

    const hasRequiredRole = this.requiredRoles.some(
      (role) => userRole === role,
    );

    if (!hasRequiredRole) {
      res.status(403).json({ message: 'You are not permitted' });
    }

    return hasRequiredRole;
  }
}
