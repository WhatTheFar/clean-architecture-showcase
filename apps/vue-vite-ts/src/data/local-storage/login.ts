const LOCAL_STORAGE_TOKEN = 'TOKEN';

export class LoginLocalStorage {
  public setToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }
}
