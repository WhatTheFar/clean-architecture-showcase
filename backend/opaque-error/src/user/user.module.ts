import { Module } from '@nestjs/common';
import { UserDataMapper } from './database/user.mapper';
import { UserDatabase } from './database/user.database';
import {
  UserInteractorInput,
  UserInteractor,
  UserInteractorOutput,
} from './domain/user.interactor';
import { UserDataGateway } from './domain/user.gateway';
import { UserController } from './interface/user.controller';
import { UserPresenter } from './interface/user.presenter';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserInteractorInput,
      useClass: UserInteractor,
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
