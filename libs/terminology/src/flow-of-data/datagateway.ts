import { User } from './entity';
import { UserTable } from './orm';

export function createUser(user: User): void {
  UserTable.insert(user);
  return;
}

export function getUserByUsername(username: string): User {
  return UserTable.find({ username });
}
