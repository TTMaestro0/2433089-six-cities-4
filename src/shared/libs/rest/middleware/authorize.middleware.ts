import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../types/middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';

export class AuthorizeMiddleware implements Middleware {
  constructor(
    private readonly jwtSecret: string,
    private readonly allowAnonymous: boolean
  ) {}

  public async handleAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      if (this.allowAnonymous) {
        next();
        return;
      }
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Authorization token is empty');
    }

    try {
      const encodedSecret = new TextEncoder().encode(this.jwtSecret);
      const token = authorizationHeader.split(' ')[1];
      const result = await jwtVerify(token, encodedSecret);
      const { userId } = result.payload;
      res.locals.userId = userId;
    } catch (err: unknown) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Incorrect authorization token', String(err));
    }

    next();
  }
}
