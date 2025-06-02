import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import 'reflect-metadata';
import { Logger } from '../../libs/logger/index.js';

import { Component } from '../../types/index.js';
import { OfferEntity } from '../offer/index.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async checkIdExists(id: Types.ObjectId): Promise<boolean> {
    const result = await this.commentModel.findById(id);
    return Boolean(result);
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    const aggregation = await this.commentModel.aggregate([{'$match': {offerId: String(dto.offerId)}}, {'$group': {_id: null, count: {'$sum': 1}, average: {'$avg': '$rating'}}}]).exec();
    await this.offerModel.findByIdAndUpdate(dto.offerId, {commentsNumber: aggregation[0].count, rating: aggregation[0].average}).exec();

    this.logger.info(`New comment created: ${result._id}`);

    return result;
  }

  public async findAllForOffer(offerId: string, limit: number, skip: number): Promise<DocumentType<CommentEntity>[]> {
    return await this.commentModel.find({offerId: {$eq: offerId}}).populate('authorId').skip(skip).limit(limit).exec();
  }
}
