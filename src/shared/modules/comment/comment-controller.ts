import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import {AuthorizeMiddleware, BaseController} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { CommentService } from './comment-service.interface.js';
import { CreateCommentDto } from './index.js';
import { ObjectIdValidatorMiddleware } from '../../libs/rest/index.js';
import { SchemaValidatorMiddleware } from '../../libs/rest/middleware/schema-validator.middleware.js';
import { createCommentDtoSchema } from './dto-schemas/create-comment-dto.schemas.js';
import { Config } from '../../libs/config/index.js';
import { RestSchema } from '../../libs/config/index.js';
import {OfferService} from '../offer/index.js';
import {toFullModel} from './converters.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.CommentService) private commentService: CommentService,
    @inject(Component.OfferService) private offerService: OfferService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.addRoute({path: '/:offerId/comments', method: HttpMethod.Get, handler: this.index.bind(this), middlewares: [new ObjectIdValidatorMiddleware(this.offerService, 'offerId')]});
    this.addRoute({path: '/:offerId/comments', method: HttpMethod.Post, handler: this.create.bind(this), middlewares: [new SchemaValidatorMiddleware(createCommentDtoSchema), new ObjectIdValidatorMiddleware(this.offerService, 'offerId'), new AuthorizeMiddleware(this.config.get('JWT_SECRET'))]});
  }

  private async create(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { offerId } = req.params;
    const dto = plainToClass(CreateCommentDto, req.body);
    dto.authorId = userId;
    dto.offerId = offerId;
    const comment = await this.commentService.create(dto);
    this.created(res, toFullModel(comment));
  }

  private async index(req: Request, res: Response): Promise<void> {
    const { limit, skip } = req.query;

    const defaultLimit = 60;
    const limitValue = limit ? parseInt(limit as string, 10) : defaultLimit;

    if (isNaN(limitValue)) {
      this.sendBadRequest('limit', limit);
    }

    const defaultSkip = 0;
    const skipValue = skip ? parseInt(skip as string, 10) : defaultSkip;

    if (isNaN(skipValue)) {
      this.sendBadRequest('skip', skip);
    }

    const { offerId } = req.params;

    const result = await this.commentService.findAllForOffer(offerId, limitValue, skipValue);
    this.ok(res, result.map((c) => toFullModel(c)));
  }

  private sendBadRequest<T>(paramName: string, value: T): void {
    const error = `Wrong value for ${paramName}: ${value}`;
    this.logger.warn(error);
    throw new HttpError(StatusCodes.BAD_REQUEST, error);
  }
}
