import { Injectable } from '@nestjs/common';

import {
  DuplicateUsernameError,
  UsernameNotFoundError,
} from '../domain/user.gateway';

export class UserData {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {
    this.createdAt = new Date();
  }
  public createdAt: Date;
}

@Injectable()
export class UserDatabase {
  private storage: { [username: string]: UserData } = {};

  public async createUser(user: UserData): Promise<void> {
    if (user.username in this.storage) {
      throw new DuplicateUsernameError();
    }
    this.storage[user.username] = user;
    return;
  }

  public async getUserByUsername(username: string): Promise<UserData> {
    if (username in this.storage) {
      return this.storage[username];
    }
    throw new UsernameNotFoundError();
  }

  public async isUsernameExist(username: string): Promise<boolean> {
    if (username in this.storage) {
      return true;
    }
    return false;
  }
}
