import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
