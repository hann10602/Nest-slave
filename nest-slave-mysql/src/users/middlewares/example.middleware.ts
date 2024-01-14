import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    }

    if (authorization === 'Bearer token') {
      next();
    } else {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
  }
}
