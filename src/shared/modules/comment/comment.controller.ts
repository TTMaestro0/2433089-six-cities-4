import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../types/component.enum.js';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-root.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ]
    });
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }
    const comment = await this.commentService.create({ ...body, userId: user.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
