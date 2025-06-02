import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import { Controller } from './controller.interface.js';
import { Logger } from '../../logger/index.js';
import { Route } from '../types/route.interface.js';
import asyncHandler from 'express-async-handler';
import {HttpMethod} from '../types/http-method.enum.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.handleAsync.bind(item))
    );
    const wrappedHandler = asyncHandler(route.handler.bind(route));

    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrappedHandler] : [wrappedHandler];

    for (const handler of allHandlers) {
      switch (route.method) {
        case HttpMethod.Get:
          this.router.get(route.path, async (res, req, next) => await handler(res, req, next));
          break;
        case HttpMethod.Post:
          this.router.post(route.path, async (res, req, next) => await handler(res, req, next));
          break;
        case HttpMethod.Delete:
          this.router.delete(route.path, async (res, req, next) => await handler(res, req, next));
          break;
        case HttpMethod.Put:
          this.router.put(route.path, async (res, req, next) => await handler(res, req, next));
          break;
        case HttpMethod.Patch:
          this.router.patch(route.path, async (res, req, next) => await handler(res, req, next));
          break;
      }
    }

    this.logger.info(`Registered route: ${route.method} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT, null);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
