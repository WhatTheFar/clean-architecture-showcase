import { User } from './entity';

export class UserTable {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static insert(_user: User): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static find(_user: Partial<Omit<User, 'password'>>): User {
    throw new Error('Method not implemented.');
  }
}
