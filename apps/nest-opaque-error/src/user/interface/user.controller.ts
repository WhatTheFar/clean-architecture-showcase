import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { HttpViewModel } from '../../common/http-viewmodel';
import { UserInteractorInput } from '../domain/user.interactor';
import { CreateUserReq, UserTokenReq, UserTokenRes } from './user.dto';

function sendHttpResponse(viewModel: HttpViewModel, res: Response) {
  res.status(viewModel.getStatus());
  if (viewModel.getPayload()) {
    res.json(viewModel.getPayload());
  } else {
    res.json();
  }
}

@Controller('user')
export class UserController {
  constructor(
    private readonly viewModel: HttpViewModel,
    private readonly userInteractor: UserInteractorInput
  ) {}

  @Post()
  @ApiCreatedResponse()
  public async createUser(@Body() req: CreateUserReq, @Res() res: Response) {
    await this.userInteractor.createUser(req);
    sendHttpResponse(this.viewModel, res);
  }

  @Post('token')
  @ApiOkResponse({ type: UserTokenRes })
  public async userToken(@Body() req: UserTokenReq, @Res() res: Response) {
    await this.userInteractor.requestToken(req);
    sendHttpResponse(this.viewModel, res);
  }
}
