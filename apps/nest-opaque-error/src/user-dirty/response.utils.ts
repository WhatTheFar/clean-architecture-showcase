import { Response } from 'express';

export class ResponseUtil {
  public static sendUnauthorized = (res: Response) =>
    res.status(401).json({
      name: 'AuthorizationError',
      code: 100,
      message: 'Unauthorized',
    });

  public static sendTokenExpiredError = (res: Response) =>
    res.status(401).json({
      name: 'TokenExpiredError',
      code: 101,
      message: 'Token is expired',
    });

  public static sendInvalidId = (res: Response) =>
    res.status(400).json({
      name: 'InvalidIdError',
      code: 102,
      message: 'Invalid ID',
    });

  public static sendValidationError = (res: Response, errors: unknown[]) =>
    res.status(400).json({
      name: 'ValidationError',
      code: 103,
      message: 'Request parameters is not valid',
      errors,
    });

  public static sendDuplicateKeyError = function (
    res: Response,
    message: string
  ) {
    res.status(400).json({
      name: 'DuplicateKeyError',
      code: 11000,
      message,
    });
  };
}
