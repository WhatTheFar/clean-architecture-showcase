import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public async create(_userData: {
    username: string;
    password: string;
  }): Promise<void> {
    // create user here
  }
}
