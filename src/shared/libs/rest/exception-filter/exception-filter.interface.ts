import { Request, Response, NextFunction } from 'express';

export interface ExceptionFilter {
  handle(err: Error, req: Request, res: Response, next: NextFunction): void;
}
