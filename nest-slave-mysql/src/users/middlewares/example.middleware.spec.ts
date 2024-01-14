import { Test, TestingModule } from '@nestjs/testing';
import { UsersMiddleware } from './example.middleware';

describe('UsersMiddleware', () => {
  let middleware: UsersMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMiddleware],
    }).compile();

    middleware = module.get<UsersMiddleware>(UsersMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });
});
