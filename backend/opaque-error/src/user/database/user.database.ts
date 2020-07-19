import {
  DuplicateUsernameError,
  UsernameNotFoundError,
} from '../domain/user.gateway';
import { Injectable } from '@nestjs/common';

export class UserData {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {
    this.createdAt = new Date();
  }
  public createdAt: Date;
}

@Injectable()
export class UserDatabase {
  private storage: { [username: string]: UserData } = {};

  public async createUser(user: UserData): Promise<void> {
    if (this.storage.hasOwnProperty(user.username)) {
      throw new DuplicateUsernameError();
    }
    this.storage[user.username] = user;
    return;
  }

  public async getUserByUsername(username: string): Promise<UserData> {
    if (!this.storage.hasOwnProperty(username)) {
      throw new UsernameNotFoundError();
    }
    return this.storage[username];
  }

  public async isUsernameExist(username: string): Promise<boolean> {
    if (this.storage.hasOwnProperty(username)) {
      return true;
    }
    return false;
  }
}
