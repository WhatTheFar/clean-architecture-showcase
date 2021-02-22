import { User } from './user.entity';

export class DuplicateUsernameError extends Error {}
export class UsernameNotFoundError extends Error {}

export abstract class UserDataGateway {
  public abstract isUsernameExist(username: string): Promise<boolean>;
  public abstract createUser(data: {
    username: string;
    hashedPassword: string;
  }): Promise<void>;
  public abstract getUserByUsername(username: string): Promise<User>;
}
