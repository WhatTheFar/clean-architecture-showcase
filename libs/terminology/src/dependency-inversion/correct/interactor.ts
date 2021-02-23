import { User } from './entity';

//
// ┌────────────┐   Dependency  ┌──────────────┐
// │            │ <------------ │              │
// │ Interactor │               │ Data Gateway │
// │            │ ────────────> │              │
// └────────────┘    Control    └──────────────┘
//

export interface UserDataGateway {
  getUserByUsername(username: string): User;
}

export class UserInteractor {
  constructor(private readonly dataGateway: UserDataGateway) {}

  public login(username: string, password: string): boolean {
    const user = this.dataGateway.getUserByUsername(username);
    return user.password == password;
  }
}
