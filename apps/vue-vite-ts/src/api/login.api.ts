export class LoginAPI {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async issueToken(
    _username: string,
    _password: string
  ): Promise<string> {
    // TODO: make an api request here
    return 'mock_token';
  }
}
