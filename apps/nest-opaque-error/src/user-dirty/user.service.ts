import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async create(_userData: {
    username: string;
    password: string;
  }): Promise<void> {
    // create user here
    throw new Error('Method not implemented.');
  }
}
