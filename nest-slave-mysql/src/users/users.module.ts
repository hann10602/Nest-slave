import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersMiddleware } from './middlewares/example.middleware';
import { UsersService } from './services/users/users.service';
import { AnotherMiddleware } from './middlewares/another.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes(
        {
          path: 'api/v1/users/**',
          method: RequestMethod.GET,
        },
        {
          path: 'api/v1/users/**',
          method: RequestMethod.POST,
        },
      )
      .apply(AnotherMiddleware)
      .forRoutes(
        {
          path: 'api/v1/users/**',
          method: RequestMethod.GET,
        },
        {
          path: 'api/v1/users/**',
          method: RequestMethod.POST,
        },
      );
  }
}
