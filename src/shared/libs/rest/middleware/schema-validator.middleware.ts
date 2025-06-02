import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from '../types/middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { ObjectSchema } from 'joi';

export class SchemaValidatorMiddleware implements Middleware {
  constructor(private schema: ObjectSchema) {}

  public async handleAsync(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const result = await this.schema.validateAsync(req.body, {
      context: { isEditForm: req.method === 'POST' }
    });

    if (result.error !== null) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Body does not match the scheme',
        result.error
      );
    }
    req.body = result;
    return next();
  }
}
