import { UserService } from './user.service';
import { Response } from 'express';
import { ResponseUtil } from './response.utils';

export class CreateUserReq {
  public username!: string;
  public password!: string;
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async createUser(req: CreateUserReq, res: Response): Promise<void> {
    try {
      this.userService.create(req);
    } catch (error) {
      if (error.name === 'MongoError') {
        if (error.code === 11000) {
          // Duplicate username
          return ResponseUtil.sendDuplicateKeyError(res, 'Username is invalid');
        }
      }
      // Nestjs will handle unknown error as 500 internal error
      throw error;
    }
  }
}
