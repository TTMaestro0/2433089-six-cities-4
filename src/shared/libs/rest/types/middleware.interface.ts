import { NextFunction, Request, Response } from 'express';

export interface Middleware {
  handleAsync(req: Request, res: Response, next: NextFunction): Promise<void>;
}
