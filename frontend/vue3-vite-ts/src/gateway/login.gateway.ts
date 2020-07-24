import { LoginGateway } from '/@/domain/usecase/login/login.gateway';
import { LoginAPI } from '/@/api/login.api';
import { LoginLocalStorage } from '/@/data/local-storage/login';

export class LoginDataGateway implements LoginGateway {
  constructor(
    private readonly loginAPI: LoginAPI,
    private readonly loginLocalStorage: LoginLocalStorage
  ) {}

  issueToken(username: string, password: string): Promise<string> {
    return this.loginAPI.issueToken(username, password);
  }
  saveTokenToLocal(token: string): void {
    this.loginLocalStorage.setToken(token);
  }
  loadTokenFromLocal(): string | null {
    return this.loginLocalStorage.getToken();
  }

  public static new(): LoginDataGateway {
    return new LoginDataGateway(new LoginAPI(), new LoginLocalStorage());
  }
}
