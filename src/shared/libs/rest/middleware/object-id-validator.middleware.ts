import { NextFunction, Request, Response } from 'express';
import { isValidObjectId, Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from '../types/middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { CheckIdService } from '../types/check-id-service.interface.js';

export class ObjectIdValidatorMiddleware implements Middleware {
  constructor(
    private service: CheckIdService,
    private param: string
  ) {}

  public async handleAsync(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const value = req.params[this.param];

    if (!isValidObjectId(value)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${this.param} is invalid ObjectID`
      );
    }
    const objectId = Types.ObjectId.createFromHexString(value);
    if (!await this.service.checkIdExists(objectId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.param} not found in service`
      );
    }

    return next();
  }
}
