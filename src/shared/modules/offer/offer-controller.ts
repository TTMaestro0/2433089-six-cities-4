import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import {AuthorizeMiddleware, BaseController} from '../../libs/rest/index.js';
import { City, Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { plainToClass } from 'class-transformer';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { PutOfferDto } from './dto/put-offer.dto.js';
import { isValidObjectId, Types } from 'mongoose';
import {HttpError, HttpMethod} from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { ObjectIdValidatorMiddleware } from '../../libs/rest/index.js';
import { SchemaValidatorMiddleware } from '../../libs/rest/middleware/schema-validator.middleware.js';
import { createOfferDtoSchema } from './dto-schemas/create-offer-dto.schema.js';
import { putOfferDtoSchema } from './dto-schemas/put-offer-dto.schems.js';
import { Config } from '../../libs/config/index.js';
import { RestSchema } from '../../libs/config/index.js';
import {toFullModel} from './converters.js';
import {UserService} from '../user/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private offerService: OfferService,
    @inject(Component.UserService) private userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.indexPremiumForCity.bind(this), middlewares: [new AuthorizeMiddleware(this.config.get('JWT_SECRET'), true)]});

    this.addRoute({path: '/favourite', method: HttpMethod.Get, handler: this.indexFavouriteForUser.bind(this), middlewares: [new AuthorizeMiddleware(this.config.get('JWT_SECRET'), false)]});
    this.addRoute({path: '/favourite/:id', method: HttpMethod.Post, handler: this.addToFavourite.bind(this), middlewares: [new ObjectIdValidatorMiddleware(this.offerService, 'id'), new AuthorizeMiddleware(this.config.get('JWT_SECRET'), false)]});
    this.addRoute({path: '/favourite/:id', method: HttpMethod.Delete, handler: this.removeFromFavourite.bind(this), middlewares: [new ObjectIdValidatorMiddleware(this.offerService, 'id'), new AuthorizeMiddleware(this.config.get('JWT_SECRET'), false)]});

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index.bind(this), middlewares: [new AuthorizeMiddleware(this.config.get('JWT_SECRET'), true)]});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create.bind(this), middlewares: [new SchemaValidatorMiddleware(createOfferDtoSchema), new AuthorizeMiddleware(this.config.get('JWT_SECRET'),false)]});
    this.addRoute({path: '/:id', method: HttpMethod.Get, handler: this.showById.bind(this), middlewares: [new AuthorizeMiddleware(this.config.get('JWT_SECRET'), true), new ObjectIdValidatorMiddleware(this.offerService, 'id')]});
    this.addRoute({path: '/:id', method: HttpMethod.Put, handler: this.updateById.bind(this), middlewares: [new AuthorizeMiddleware(this.config.get('JWT_SECRET'), false), new SchemaValidatorMiddleware(putOfferDtoSchema), new ObjectIdValidatorMiddleware(this.offerService, 'id')]});
    this.addRoute({path: '/:id', method: HttpMethod.Delete, handler: this.deleteById.bind(this), middlewares: [new ObjectIdValidatorMiddleware(this.offerService, 'id'), new AuthorizeMiddleware(this.config.get('JWT_SECRET'), false)]});
  }

  private async index(req: Request, res: Response): Promise<void> {
    const { limit, skip } = req.query;
    const { userId } = res.locals;

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

    const offers = await this.offerService.findAll(limitValue, skipValue);
    const mappedResult = [];

    for (const offer of offers) {
      const author = await this.userService.findById(new Types.ObjectId(offer.authorId.toString()));
      mappedResult.push(toFullModel(offer, userId, author!, this.config.get('HOST')));
    }

    this.ok(res, mappedResult);
  }

  private async create(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const dto = plainToClass(CreateOfferDto, req.body);
    const offer = await this.offerService.create(dto, userId);
    const user = await this.userService.findById(new Types.ObjectId(String(userId)));

    this.created(res, toFullModel(offer, userId, user!, this.config.get('HOST')));
  }

  private async showById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { userId } = res.locals;

    const offer = await this.offerService.findById(new Types.ObjectId(id));

    if (offer === null) {
      this.send(res, StatusCodes.NOT_FOUND, null);
      return;
    }

    const author = await this.userService.findById(new Types.ObjectId(offer.authorId.toString()));

    this.ok(res, toFullModel(offer, userId, author!, this.config.get('HOST')));
  }

  private async updateById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { userId } = res.locals;
    const offerId = new Types.ObjectId(id);

    const offerFromDb = await this.offerService.findById(offerId);
    if (offerFromDb?.authorId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'No access to delete offer');
    }

    const dto = plainToClass(PutOfferDto, req.body);
    const offer = await this.offerService.change(new Types.ObjectId(id), dto);

    if (offer === null) {
      this.send(res, StatusCodes.NOT_FOUND, null);
      return;
    }

    const user = await this.userService.findById(new Types.ObjectId(String(userId)));
    this.ok(res, toFullModel(offer, userId, user!, this.config.get('HOST')));
  }

  private async deleteById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { userId } = res.locals;
    const offerId = new Types.ObjectId(id);

    const offer = await this.offerService.findById(offerId);
    if (offer?.authorId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'No access to delete offer');
    }

    await this.offerService.deleteById(offerId);
    this.noContent(res);
  }

  private async indexPremiumForCity(req: Request, res: Response): Promise<void> {
    const { city } = req.params;
    const { userId } = res.locals;

    const cityValue = city as City;
    if (!cityValue) {
      this.sendBadRequest('city', city);
    }

    const { limit, skip } = req.query;

    const defaultLimit = 3;
    const limitValue = limit ? parseInt(limit as string, 10) : defaultLimit;

    if (isNaN(limitValue)) {
      this.sendBadRequest('limit', limit);
    }

    const defaultSkip = 0;
    const skipValue = skip ? parseInt(skip as string, 10) : defaultSkip;

    if (isNaN(skipValue)) {
      this.sendBadRequest('skip', skip);
    }

    const offers = await this.offerService.findAllPremium(cityValue, limitValue, skipValue);
    const mappedResult = [];

    for (const offer of offers) {
      const author = await this.userService.findById(new Types.ObjectId(offer.authorId.toString()));
      mappedResult.push(toFullModel(offer, userId, author!, this.config.get('HOST')));
    }

    this.ok(res, mappedResult);
  }

  private async indexFavouriteForUser(req: Request, res: Response): Promise<void> {
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

    const { userId } = res.locals;

    const offers = await this.offerService.findAllFavourite(userId, limitValue, skipValue);
    const mappedResult = [];

    for (const offer of offers) {
      const author = await this.userService.findById(new Types.ObjectId(offer.authorId.toString()));
      mappedResult.push(toFullModel(offer, userId, author!, this.config.get('HOST')));
    }

    this.ok(res, mappedResult);
  }

  private async addToFavourite(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      this.sendBadRequest('id', id);
    }

    await this.offerService.addToFavourite(new Types.ObjectId(id), userId);
    this.noContent(res);
  }

  private async removeFromFavourite(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      this.sendBadRequest('id', id);
    }

    await this.offerService.removeFromFavourite(new Types.ObjectId(id), userId);
    this.noContent(res);
  }

  private sendBadRequest<T>(paramName: string, value: T): void {
    const error = `Wrong value for ${paramName}: ${value}`;
    this.logger.warn(error);
    throw new HttpError(StatusCodes.BAD_REQUEST, error);
  }
}
