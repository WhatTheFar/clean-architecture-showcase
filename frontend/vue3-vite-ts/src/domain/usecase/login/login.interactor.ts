import { LoginGateway } from './login.gateway';
import * as Password from './password';

export interface LoginOutput {
  loggedIn(): void;

  pleaseChooseAPasswd(toggle: boolean): void;
  passwdContainALowercase(contain: boolean): void;
  passwdContainAnUppercase(contain: boolean): void;
  passwdLengthInRange(match: boolean, min: number, max: number): void;
}

export interface LoginNavigator {
  homepage(): void;

  goTo(location: string): void;
}

const MINIMUM_PASSWORD_LENGTH = 8;
const MAXIMUM_PASSWORD_LENGTH = 32;

export class LoginInteractor {
  constructor(
    private readonly loginGateway: LoginGateway,
    private readonly output: LoginOutput,
    private readonly navigator: LoginNavigator
  ) {}

  public validatePassword(passwd: string): void {
    this._validatePassword(passwd);
    return;
  }

  private _validatePassword(passwd: string): boolean {
    // Validate an empty password
    if (passwd == '') {
      this.output.pleaseChooseAPasswd(true);
      return false;
    }
    this.output.pleaseChooseAPasswd(false);

    // Validate a lowercase letter
    const passwdContALower = Password.containALowercase(passwd);
    this.output.passwdContainALowercase(passwdContALower);

    // Validate an upper letter
    const passwdContAnUpper = Password.containAnUppercase(passwd);
    this.output.passwdContainAnUppercase(passwdContAnUpper);

    // Validate length
    const minLength = MINIMUM_PASSWORD_LENGTH;
    const maxLength = MAXIMUM_PASSWORD_LENGTH;
    const passwdLengthMatched = Password.isLengthInRange(passwd, minLength, maxLength);
    this.output.passwdLengthInRange(passwdLengthMatched, minLength, maxLength);

    return passwdContALower && passwdContAnUpper && passwdLengthMatched;
  }

  public async login(
    username: string,
    password: string,
    options: { redirect?: string } = {}
  ): Promise<void> {
    const { redirect } = options;
    if (!this._validatePassword(password)) {
      // this should not happen,
      // since users might not be able to login if the password is invalid .
      throw new Error('invalid password');
    }

    const token = await this.loginGateway.issueToken(username, password);
    this.loginGateway.saveTokenToLocal(token);

    this.output.loggedIn();
    if (redirect) {
      this.navigator.goTo(redirect);
      return;
    }
    this.navigator.homepage();
    return;
  }
}
