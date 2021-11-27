import { User, UserService } from './interface';

export class UserAPI implements UserService {
  registerUser(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
