import { UserInteractorOutput } from '../domain/user.interactor';
import { HttpView } from 'src/common/http-view';
import { UserErrorCode } from './user.error';
import { UserTokenRes } from './user.dto';
import { Injectable } from '@nestjs/common';
import { HttpViewModel } from 'src/common/http-viewmodel';

@Injectable()
export class UserPresenter implements UserInteractorOutput {
  constructor(private readonly viewModel: HttpViewModel) {}

  public async userCreated(_username: string): Promise<void> {
    this.viewModel.setCreated();
  }

  public async duplicateUsername(username: string): Promise<void> {
    this.viewModel.setBadRequest(
      UserErrorCode.DUPLICATE_USERNAME,
      `Duplicate username: ${username}`,
    );
  }

  public async invalidUsername(username: string): Promise<void> {
    this.viewModel.setBadRequest(
      UserErrorCode.INVALID_USERNAME,
      `Invalid username: ${username}`,
    );
  }

  public async invalidPasswordFor(username: string): Promise<void> {
    this.viewModel.setBadRequest(
      UserErrorCode.INVALID_PASSWORD,
      `Invalid password for ${username}`,
    );
  }

  public async returnToken(_username: string, token: string): Promise<void> {
    const payload: UserTokenRes = { token };
    this.viewModel.setOK(payload);
  }

  public async unknownError(error: Error): Promise<void> {
    this.viewModel.setInternalServerError(
      UserErrorCode.UNKNOWN,
      error.message,
      error,
    );
  }
}

@Injectable()
export class UserPresenterWithView implements UserInteractorOutput {
  constructor(private readonly view: HttpView) {}

  public async userCreated(_username: string): Promise<void> {
    this.view.sendCreated();
  }

  public async duplicateUsername(username: string): Promise<void> {
    this.view.sendBadRequest(
      UserErrorCode.DUPLICATE_USERNAME,
      `Duplicate username: ${username}`,
    );
  }

  public async invalidUsername(username: string): Promise<void> {
    this.view.sendBadRequest(
      UserErrorCode.INVALID_USERNAME,
      `Invalid username: ${username}`,
    );
  }

  public async invalidPasswordFor(username: string): Promise<void> {
    this.view.sendBadRequest(
      UserErrorCode.INVALID_PASSWORD,
      `Invalid password for ${username}`,
    );
  }

  public async returnToken(_username: string, token: string): Promise<void> {
    const payload: UserTokenRes = { token };
    this.view.sendOK(payload);
  }

  public async unknownError(error: Error): Promise<void> {
    this.view.sendInternalServerError(
      UserErrorCode.UNKNOWN,
      error.message,
      error,
    );
  }
}
