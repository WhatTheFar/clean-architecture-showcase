export interface LoginGateway {
  // TODO: shouldRetry()
  issueToken(username: string, password: string): Promise<string>;

  saveTokenToLocal(token: string): void;
  loadTokenFromLocal(): string | null;
}
