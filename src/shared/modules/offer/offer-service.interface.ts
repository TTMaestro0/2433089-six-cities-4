import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { PutOfferDto } from './dto/put-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import {City} from '../../types/index.js';
import {Types} from 'mongoose';
import { CheckIdService } from '../../libs/rest/types/check-id-service.interface.js';

export interface OfferService extends CheckIdService {
  create(dto: CreateOfferDto, userId: string): Promise<DocumentType<OfferEntity>>;
  change(id: Types.ObjectId, dto: PutOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: Types.ObjectId): Promise<void>;
  findById(id: Types.ObjectId): Promise<DocumentType<OfferEntity> | null>;
  findAll(limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllPremium(city: City, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  findAllFavourite(userId: Types.ObjectId, limit: number, skip: number): Promise<DocumentType<OfferEntity>[]>;
  addToFavourite(orderId: Types.ObjectId, userId: string): Promise<void>;
  removeFromFavourite(orderId: Types.ObjectId, userId: string): Promise<void>;
}
