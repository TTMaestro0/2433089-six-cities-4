import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Request, Response, NextFunction } from 'express';
import {Component} from '../../../types/index.js';
import pino from 'pino';
import Logger = pino.Logger;
import {HttpError} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';

@injectable()
export class LoggingExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private logger: Logger
  ) {}

  handle(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof HttpError) {
      res.statusCode = err.httpStatusCode;
      res.send({error: err.message, detail: err.detail});
    }

    this.logger.error(err.message, err);
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.send({error: err.message});
  }
}
