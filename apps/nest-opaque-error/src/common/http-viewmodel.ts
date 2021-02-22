import { Injectable, Scope } from '@nestjs/common';

import { HttpStatus } from './http-status.enum';

@Injectable({ scope: Scope.REQUEST })
export class HttpViewModel {
  private status = 502;
  private payload: unknown = null;

  private setStatus(status: HttpStatus): void {
    this.status = status;
  }
  public getStatus(): number {
    return this.status;
  }

  private setPayload(payload: unknown): void {
    this.payload = payload;
  }
  public getPayload(): unknown {
    return this.payload;
  }

  public setOK(): void;
  public setOK(payload: unknown): void;
  public setOK(payload?: unknown): void {
    this.setStatus(HttpStatus.OK);
    this.setPayload(payload);
  }

  public setCreated(): void {
    this.setStatus(HttpStatus.CREATED);
    this.setPayload(null);
  }

  public setBadRequest(errorCode: number, message: string): void {
    this.setStatus(HttpStatus.BAD_REQUEST);
    this.setPayload(this.errorMessageFor(errorCode, message));
  }

  public setInternalServerError(
    errorCode: number,
    message: string,
    error: Error
  ): void {
    this.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    this.setPayload(this.errorMessageFor(errorCode, message, error));
  }

  private errorMessageFor(
    errorCode: number,
    message: string
  ): { message: string; code: number };
  private errorMessageFor(
    errorCode: number,
    message: string,
    error: Error
  ): { message: string; code: number; error: Error };
  private errorMessageFor(
    errorCode: number,
    message: string,
    error?: Error
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
