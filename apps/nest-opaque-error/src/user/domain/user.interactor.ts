import { Injectable } from '@nestjs/common';

import {
  UserDataGateway,
  DuplicateUsernameError,
  UsernameNotFoundError,
} from './user.gateway';
import { User } from './user.entity';

export abstract class UserInteractorInput {
  public abstract createUser(req: {
    username: string;
    password: string;
  }): Promise<void>;
  public abstract requestToken(req: {
    username: string;
    password: string;
  }): Promise<void>;
}

export interface IUserInteractorOutput {
  userCreated(username: string): Promise<void>;
  duplicateUsername(username: string): Promise<void>;
  invalidUsername(username: string): Promise<void>;
  invalidPasswordFor(username: string): Promise<void>;
  returnToken(username: string, token: string): Promise<void>;

  unknownError(error: Error): Promise<void>;
}

export abstract class UserInteractorOutput {
  public abstract userCreated(username: string): Promise<void>;
  public abstract duplicateUsername(username: string): Promise<void>;
  public abstract invalidUsername(username: string): Promise<void>;
  public abstract invalidPasswordFor(username: string): Promise<void>;
  public abstract returnToken(username: string, token: string): Promise<void>;

  public abstract unknownError(error: Error): Promise<void>;
}

@Injectable()
export class UserInteractor implements UserInteractorInput {
  constructor(
    private readonly userDataGateway: UserDataGateway,
    private readonly output: UserInteractorOutput
  ) {}

  public async createUser(req: {
    username: string;
    password: string;
  }): Promise<void> {
    const { username, password } = req;
    const hashedPassword = hashPassword(password);

    try {
      await this.userDataGateway.createUser({ username, hashedPassword });
    } catch (error) {
      if (error instanceof DuplicateUsernameError) {
        await this.output.duplicateUsername(username);
        return;
      }
      await this.output.unknownError(error);
      return;
    }

    await this.output.userCreated(username);
    return;
  }

  public async requestToken(req: {
    username: string;
    password: string;
  }): Promise<void> {
    const { username, password } = req;

    let user: User;
    try {
      user = await this.userDataGateway.getUserByUsername(username);
    } catch (error) {
      if (error instanceof UsernameNotFoundError) {
        await this.output.invalidUsername(username);
        return;
      }
      await this.output.unknownError(error);
      return;
    }

    const isValid = validatePassword(password, user.hashedPassword);
    if (isValid) {
      const token = tokenFor(username);
      await this.output.returnToken(username, token);
      return;
    } else {
      await this.output.invalidPasswordFor(username);
      return;
    }
  }
}

@Injectable()
export class UserInteractorOpaqueError implements UserInteractorInput {
  constructor(
    private readonly userDataGateway: UserDataGateway,
    private readonly output: UserInteractorOutput
  ) {}

  public async createUser(req: {
    username: string;
    password: string;
  }): Promise<void> {
    const { username, password } = req;

    try {
      // check upfront if the username exists
      // which could lead to error while creating a user
      if (await this.userDataGateway.isUsernameExist(username)) {
        await this.output.duplicateUsername(username);
        return;
      }

      const hashedPassword = hashPassword(password);
      await this.userDataGateway.createUser({ username, hashedPassword });
    } catch (error) {
      // should not be an error of duplicate username
      await this.output.unknownError(error);
      return;
    }

    await this.output.userCreated(username);
    return;
  }

  public async requestToken(req: {
    username: string;
    password: string;
  }): Promise<void> {
    const { username, password } = req;

    try {
      if (!(await this.userDataGateway.isUsernameExist(username))) {
        await this.output.invalidUsername(username);
        return;
      }

      const user = await this.userDataGateway.getUserByUsername(username);
      const isValid = validatePassword(password, user.hashedPassword);
      if (isValid) {
        const token = tokenFor(username);
        await this.output.returnToken(username, token);
        return;
      } else {
        await this.output.invalidPasswordFor(username);
        return;
      }
    } catch (error) {
      await this.output.unknownError(error);
      return;
    }
  }
}

function hashPassword(password: string): string {
  return password;
}

function validatePassword(password: string, hashedPassword: string): boolean {
  return password == hashedPassword;
}

function tokenFor(username: string): string {
  return username;
}
