import { Response } from 'express';
import { Injectable, Scope } from '@nestjs/common';
import { HttpStatus } from './http-status.enum';

export abstract class HttpView {
  public abstract sendOK(): void;
  public abstract sendOK(payload: any): void;
  public abstract sendCreated(): void;
  public abstract sendBadRequest(errorCode: number, message: string): void;
  public abstract sendInternalServerError(
    errorCode: number,
    message: string,
    error: Error,
  ): void;
}

@Injectable({ scope: Scope.REQUEST })
export class ExpressHttpView implements HttpView {
  constructor(private readonly res: Response) {}

  public sendOK(): void;
  public sendOK(payload: any): void;
  public sendOK(payload?: any): void {
    if (payload == null) {
      this.res.sendStatus(HttpStatus.OK);
      return;
    }
    this.res.status(HttpStatus.OK).json(payload);
    return;
  }

  public sendCreated(): void {
    this.res.sendStatus(HttpStatus.CREATED);
  }

  public sendBadRequest(errorCode: number, message: string): void {
    this.res
      .status(HttpStatus.BAD_REQUEST)
      .json(this.errorMessageFor(errorCode, message));
  }

  public sendInternalServerError(
    errorCode: number,
    message: string,
    error: Error,
  ): void {
    this.res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(this.errorMessageFor(errorCode, message, error));
  }

  private errorMessageFor(
    errorCode: number,
    message: string,
  ): { message: string; code: number };
  private errorMessageFor(
    errorCode: number,
    message: string,
    error: Error,
  ): { message: string; code: number; error: Error };
  private errorMessageFor(
    errorCode: number,
    message: string,
    error?: Error,
  ): { message: string; code: number; error?: Error } {
    if (error == null) {
      return {
        message,
        code: errorCode,
      };
    }
    return {
      message,
      code: errorCode,
      error,
    };
  }
}
