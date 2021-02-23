import { User } from './entity';
import { UserDataGateway } from './interactor';

export class UserDataGatewayImpl implements UserDataGateway {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getUserByUsername(_username: string): User {
    throw new Error('Method not implemented.');
  }
}
