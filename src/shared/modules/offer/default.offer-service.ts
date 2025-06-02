import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { PutOfferDto } from './dto/put-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { City } from '../../types/index.js';
import { Types } from 'mongoose';
import {CommentEntity} from '../comment/index.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async checkIdExists(id: Types.ObjectId): Promise<boolean> {
    const result = await this.offerModel.findById(id);
    return Boolean(result);
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(id: Types.ObjectId): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(id).exec();
  }

  public async change(id: Types.ObjectId, dto: PutOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndUpdate(id, dto).exec();
    this.logger.info(`Update offer: ${result?.name}`);
    return result;
  }

  public async deleteById(id: Types.ObjectId): Promise<void> {
    const result = await this.offerModel.findByIdAndDelete(id);
    await this.commentModel.deleteMany({offerId: String(id)}).exec();
    this.logger.info(`Offer deleted: ${result?.name}`);
  }

  public async findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().skip(skip).limit(limit);
  }

  public async findAllPremium(city: City, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true, city: city}).skip(skip).limit(limit).exec();
  }

  public async findAllFavourite(userId: Types.ObjectId, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({favouriteUsers: {'$in': [userId]}}).skip(skip).limit(limit).exec();
  }

  public async addToFavourite(orderId: Types.ObjectId, userId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(orderId, {'$push': {favouriteUsers: userId}}).exec();
  }

  public async removeFromFavourite(orderId: Types.ObjectId, userId: string): Promise<void> {
    await this.offerModel.findByIdAndUpdate(orderId, {'$pull': {favouriteUsers: userId}}).exec();
  }
}
