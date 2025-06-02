import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../types/middleware.interface.js';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private readonly rootPath: string,
    private readonly param: string
  ) {}

  public async handleAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.rootPath,
      filename(_req, file, callback) {
        const fileExtension = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtension}`);
      },
    });

    multer({ storage }).single(this.param)(req, res, next);
  }
}
