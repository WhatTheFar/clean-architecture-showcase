import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { UserDatabase } from './database/user.database';
import { UserDataMapper } from './database/user.mapper';
import { UserDataGateway } from './domain/user.gateway';
import {
  UserInteractorOpaqueError,
  UserInteractorInput,
  UserInteractorOutput,
} from './domain/user.interactor';
import { UserController } from './interface/user.controller';
import { UserPresenter } from './interface/user.presenter';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserInteractorInput,
      useClass: UserInteractorOpaqueError,
    },
    {
      provide: UserInteractorOutput,
      useClass: UserPresenter,
    },
    {
      provide: UserDataGateway,
      useClass: UserDataMapper,
    },
    UserDatabase,
  ],
})
export class UserModule {}
