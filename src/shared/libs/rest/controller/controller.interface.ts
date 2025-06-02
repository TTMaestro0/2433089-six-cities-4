import { Response, Router } from 'express';
import { Route } from '../types/route.interface.js';
import { StatusCodes } from 'http-status-codes';

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  send<T>(res: Response, statusCode: StatusCodes, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
