export interface User {
  username: string;
  createdAt: string;
}

export interface UserService {
  registerUser(): Promise<User>;
}
