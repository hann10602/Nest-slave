import { Test, TestingModule } from '@nestjs/testing';
import { AnotherMiddleware } from './another.middleware';

describe('UsersMiddleware', () => {
  let middleware: AnotherMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnotherMiddleware],
    }).compile();

    middleware = module.get<AnotherMiddleware>(AnotherMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });
});
