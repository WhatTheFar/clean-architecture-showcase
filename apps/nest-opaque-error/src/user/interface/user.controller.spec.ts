import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../../common/common.module';
import { UserInteractorInput } from '../domain/user.interactor';
import { UserController } from './user.controller';

class MockInteractor implements UserInteractorInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public createUser(_req: {
    username: string;
    password: string;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public requestToken(_req: {
    username: string;
    password: string;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [UserController],
      providers: [
        {
          provide: UserInteractorInput,
          useClass: MockInteractor,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
