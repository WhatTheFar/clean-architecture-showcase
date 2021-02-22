import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserReq {
  @ApiProperty({ example: 'WhatTheFar', required: true })
  @IsNotEmpty()
  public username!: string;

  @ApiProperty({ example: 'password123', required: true })
  public password!: string;
}

export class UserTokenReq {
  @ApiProperty({ example: 'WhatTheFar', required: true })
  public username!: string;

  @ApiProperty({ example: 'password123', required: true })
  public password!: string;
}

export class UserTokenRes {
  @ApiProperty({ required: true })
  public token!: string;
}
