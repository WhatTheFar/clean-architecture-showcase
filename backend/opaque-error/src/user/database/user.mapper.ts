import { UserDataGateway } from '../domain/user.gateway';
import { User } from '../domain/user.entity';
import { UserDatabase, UserData } from './user.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDataMapper implements UserDataGateway {
  constructor(private readonly db: UserDatabase) {}

  public async createUser(data: {
    username: string;
    hashedPassword: string;
  }): Promise<void> {
    const { username, hashedPassword } = data;
    const user = new UserData(username, hashedPassword);
    await this.db.createUser(user);
    return;
  }

  public async getUserByUsername(username: string): Promise<User> {
    const userData = await this.db.getUserByUsername(username);
    return new User(userData.username, userData.password);
  }

  public isUsernameExist(username: string): Promise<boolean> {
    return this.isUsernameExist(username);
  }
}
